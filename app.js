const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Creds
const mongo = require("./credentials/mongo");

// Create an Express App
const app = express();

// Imports for Routes
const userRoutes = require("./routes/user");

// Handle MongoDB Connection
mongoose
    .connect(mongo.localConnString, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

// Use body-parser to parse incoming reuests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Use Cors to avoid annoying CORS Errors
app.use(cors());

// Set up API Routes
app.use("/api/v1/user", userRoutes);

module.exports = app;