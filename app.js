require('dotenv').config();
const express = require("express");
const chalk = require('chalk');  // Importing the chalk module

const PORT = process.env.PORT;
const app = express();

//console.log(process.env); // remove this after you've confirmed it working

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