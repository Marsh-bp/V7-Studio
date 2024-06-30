const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Replace with your actual MongoDB connection string
const uri = process.env.MONGODB_URI;

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('Cluster0');
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error(error));

app.post('/api/save-phone-number', (req, res) => {
  const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'Name and phone number are required' });
  }

  const collection = db.collection('phoneNumbers');
  collection.insertOne({ name, phoneNumber })
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json({ error: 'An error occurred while saving the phone number' }));
});

app.get('/', (req, res) => {
  res.send('Hello, world! Welcome to my API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
