const express = require('express');
const Alumni = require('../models/Alumni');
const router = express.Router();

// Get all alumni
router.get('/', async (req, res) => {
  const alumni = await Alumni.find();
  res.json(alumni);
});

// Get enrollment dates and number of enrollments
router.get('/enrollment-dates', async (req, res) => {
  const enrollmentData = await Alumni.aggregate([
    { $group: { _id: "$enrollment_date", count: { $sum: 1 } } }
  ]);
  res.json(enrollmentData);
});

// Get employment status by date
router.get('/employment-status/:date', async (req, res) => {
  const { date } = req.params;
  const employmentData = await Alumni.aggregate([
    { $match: { enrollment_date: new Date(date) } },
    { $group: { _id: "$industry", count: { $sum: 1 } } }
  ]);
  res.json(employmentData);
});

// POST new alumni data
router.post('/', async (req, res) => {
    const { name, enrollment_date, employment_status, industry, company_name } = req.body;
  
    // Create a new alumni instance
    const newAlumni = new Alumni({
      name,
      enrollment_date,
      employment_status,
      industry,
      company_name
    });
    try {
        // Save the new alumni to the database
        const savedAlumni = await newAlumni.save();
        res.status(201).json(savedAlumni);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
    

module.exports = router;
