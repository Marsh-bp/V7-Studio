require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

const uri = process.env.MONGODB_URI;
let db;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('Phone_number'); // Replace with your actual database name
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  });

// API endpoint to save phone number
app.post('/api/save-phone-number', (req, res) => {
  const { name, phoneNumber } = req.body;
  console.log('Received data:', name, phoneNumber);

  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'Name and phone number are required' });
  }

  const collection = db.collection('phoneNumbers');
  collection.insertOne({ name, phoneNumber })
    .then(result => {
      console.log('Saved phone number:', result);
      res.status(201).json(result);
    })
    .catch(error => {
      console.error('Error saving phone number:', error);
      res.status(500).json({ error: 'An error occurred while saving the phone number' });
    });
});

// Root endpoint to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'V7_studio.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
