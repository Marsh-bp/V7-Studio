const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/save-phone-number', (req, res) => {
    console.log('Received request to save phone number');
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const data = `${name} - ${phoneNumber}\n`;
    fs.appendFile('phone-numbers.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send({ message: 'Failed to save phone number' });
        } else {
            console.log('Name and phone number saved successfully');
            res.status(200).send({ message: 'Name and phone number saved successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
