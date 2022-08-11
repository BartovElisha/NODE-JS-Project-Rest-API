require('dotenv').config();
const express = require("express");
const chalk = require('chalk');  // Importing the chalk module
var cors = require('cors');

const PORT = process.env.PORT;
//console.log(process.env); // remove this after you've confirmed it working

const app = express();

// Middlewares

// Middleware to allow connect to this API from All domeins !!!
// if need to reject it will be writen inside special routes !!! 
app.use(cors());  // https://www.npmjs.com/package/cors

// Middleware to check MongoDb Connection status section
const checkConnection = require("./middleware/checkConnection");
app.use(checkConnection);

app.use(express.json());

// Connect to Mongoose
require("./databases/mongoDb");  // Only for Run Mongoose
//const mongoose = require("./databases/mongoDb");

// Connect All Routes
const user = require("./routes/user");
const visitCard = require("./routes/visitCard");

// Use All Routes
app.use('/user',user);
app.use('/visitCard',visitCard);

// Listen to PORT Events
app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server is up on port: ${PORT}`));
});