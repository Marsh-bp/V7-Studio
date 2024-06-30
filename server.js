const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world! Welcome to my API');
});

app.post('/save-phone-number', async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    await client.connect();
    const database = client.db('Cluster0');
    const collection = database.collection('phone-numbers');
    const result = await collection.insertOne({ name, phoneNumber });
    res.status(200).json({ success: true, data: result.ops[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
