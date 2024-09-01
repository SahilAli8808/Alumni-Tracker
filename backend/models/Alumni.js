const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: String,
  enrollment_date: Date,
  employment_status: String,
  industry: String,
  company_name: String
});

module.exports = mongoose.model('AlumniData', alumniSchema);
