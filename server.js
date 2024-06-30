const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI; // Ensure you have this set in your environment variables
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());

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
