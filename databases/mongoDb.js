const mongoose = require('mongoose');
const chalk = require('chalk');  // Importing the chalk module

const dataBase = 'restApi';

//Use Schemes
const user = require('../models/user');

try {
    mongoose.connect(`mongodb://localhost:27017/${dataBase}`);
    console.log(chalk.yellowBright(`Connected to Mongodb Server, DataBase: ${dataBase}`));
} 
catch (error) {
    console.log(chalk.red("Error:" + error));
} 
finally {
    console.log(chalk.yellowBright("Success !!!"));
}