const express = require("express");
const chalk = require('chalk');  // Importing the chalk module

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Connect All Routes
const user = require("./routes/user");

// Connect to Mongoose
require("./databases/mongoDb");  // Only for Run Mongoose
//const mongoose = require("./databases/mongoDb");

// Use All Routes
app.use('/user',user);


// Listen to PORT Events
app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server is up on port: ${PORT}`));
});