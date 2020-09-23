const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database');

db.authenticate().then(() => console.log('connected to db'));

const app = express();
const dotenv = require("dotenv");

// Import routes
const authRoute = require('./routes/auth');

dotenv.config();

app.use(bodyParser.json());

// Route middlewares
app.use(authRoute);

app.listen(process.env.PORT, () => {
    console.log("Moletplice API is running at " + process.env.PORT);
});