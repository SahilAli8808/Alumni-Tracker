const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const Alumni = require('../models/Alumni'); // Your alumni model
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save the file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with original file name
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});

router.post('/bulk-import', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate and transform the data
    const alumniData = sheet.map(record => {
      if (!record.name || !record.enrollment_date || !record.employment_status || !record.industry) {
        throw new Error('Missing required fields in record');
      }

      // Transform enrollment_date to a Date object if needed
      const transformedRecord = {
        name: record.name,
        enrollment_date: new Date(record.enrollment_date),
        employment_status: record.employment_status,
        industry: record.industry,
        company_name: record.company_name || 'N/A', // Default to 'N/A' if company_name is not provided
      };

      return transformedRecord;
    });

    await Alumni.insertMany(alumniData);
    res.json({ message: 'Alumni data imported successfully.' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ message: `Error importing data: ${error.message}` });
  } finally {
    // Clean up the uploaded file
    fs.unlink(path.join(__dirname, '../uploads', file.originalname), (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });
  }
});

module.exports = router;
