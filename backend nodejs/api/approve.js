// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/auth-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Request Schema
const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  urgency: String,
  status: { type: String, default: 'Pending' },
});

const Request = mongoose.model('Request', requestSchema);

// API Endpoint to Approve a Request
app.post('/api/approve', async (req, res) => {
  const { title, description, type, urgency } = req.body;

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { title, description, type, urgency },
      { status: 'Approved' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
