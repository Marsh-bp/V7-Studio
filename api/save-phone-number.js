const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, phoneNumber } = req.body;

      await client.connect();
      const database = client.db('Phone_number');
      const collection = database.collection('phone-numbers');

      const result = await collection.insertOne({ name, phoneNumber });
      res.status(200).json({ success: true, data: result.ops[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
