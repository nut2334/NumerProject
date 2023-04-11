const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create an instance of the express server
const app = express();
app.use(cors());

// connect to MongoDB database
mongoose.connect('mongodb://testuser:testpassword@localhost/testdatabase', { useNewUrlParser: true });

// create a schema for a simple "Hello World" message
const linearSchema = new mongoose.Schema({
    N: Number,
    X: [],
    Y: []
});

// create a model for the message schema
const linearModel = mongoose.model('linear', linearSchema);

// define a route to retrieve the message from the database
app.get('/linear', async (req, res) => {
    // find the message in the database
    const result = await linearModel.findOne();
    console.log(result);
    // return the message as a JSON object
    res.json({ result: result });
});

// start the server
app.listen(1150, () => {
    console.log('Server is running on port 1150');
});
