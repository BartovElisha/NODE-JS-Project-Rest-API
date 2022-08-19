const mongoose = require('mongoose');
const chalk = require('chalk');  // Importing the chalk module

const dataBase = 'restApi';

//Use Schemes
const user = require('../models/user');

async function localMongoConnect() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dataBase}`);  // Local Mongo DataBase
        console.log(chalk.bgGreenBright(`Connected to Mongodb Local DataBase Server, DataBase: ${dataBase}`));
    } 
    catch (error) {
        console.log(chalk.red("Error:" + error));
    } 
    finally {
        console.log(chalk.bgGreenBright("Mongoose Operation Finished !!!"));
    }
}

async function cloadMongoConnect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.CLOAD_MONGODB_USER}:${process.env.CLOAD_MONGODB_PASSWORD}@cluster0.9zzrld0.mongodb.net/${dataBase}`,{
            useNewUrlParser: true
        });  // Cloud Mongo DataBase
        console.log(chalk.bgGreenBright(`Connected to Mongodb Cload DataBase Server, DataBase: ${dataBase}`));
    } 
    catch (error) {
        console.log(chalk.red("Error:" + error));
    } 
    finally {
        console.log(chalk.bgGreenBright("Mongoose Operation Finished !!!"));
    }
}

localMongoConnect();
//cloadMongoConnect();