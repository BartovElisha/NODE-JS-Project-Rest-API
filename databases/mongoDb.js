const mongoose = require('mongoose');

const dataBase = 'restApi';

//Use Schemes
const user = require('../models/user');

try {
    mongoose.connect(`mongodb://localhost:27017/${dataBase}`);
    console.log(`Connected to Mongodb Server, DataBase: ${dataBase}`);
} 
catch (error) {
    console.log("Error:" + error);
} 
finally {
    console.log("Success !!!");
}