const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const Alumni = require('../models/Alumni'); // Your alumni model

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
  

router.post('/bulk-import', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    Alumni.insertMany(sheet)
      .then(() => {
        res.json({ message: 'Alumni data imported successfully.' });
      })
      .catch((error) => {
        console.error('Error importing data:', error);
        res.status(500).json({ message: 'Error importing data.' });
      });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ message: 'Error processing file.' });
  }
});

module.exports = router;
