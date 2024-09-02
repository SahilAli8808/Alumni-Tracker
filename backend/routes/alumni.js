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
  console.log(`Requested date: ${date}`);

  try {
    // Log the aggregation query
    const aggregationQuery = [
      { $match: { enrollment_date: new Date(date) } },
      { 
        $group: { 
          _id: { industry: "$industry", employment_status: "$employment_status" }, 
          count: { $sum: 1 } 
        } 
      }
    ];
    console.log('Aggregation query:', JSON.stringify(aggregationQuery, null, 2));

    const employmentData = await Alumni.aggregate(aggregationQuery);

    const formattedData = employmentData.map(item => ({
      industry: item._id.industry,
      employment_status: item._id.employment_status,
      count: item.count
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching employment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
