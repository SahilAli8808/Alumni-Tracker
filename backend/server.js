const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const alumniRoutes = require('./routes/alumni');
const bulkImportRoutes = require('./routes/bulkimport');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/alumni', alumniRoutes);
app.use('/api/alumni', bulkImportRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
