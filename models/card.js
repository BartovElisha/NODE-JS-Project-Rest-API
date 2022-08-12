const mongoose = require('mongoose');
const validator = require('validator');

// Define MongoDb User Schema
const cardSchema = mongoose.Schema({
    // Task, Part 10.4
    companyName: {
        type: String,
        required: true
    },
    comapnyDescription: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyPhoneNumber: {
        type: String
    },
    companyImageUrl: {
        type: String
    },
    user_id: mongoose.SchemaTypes.ObjectId,
    // Task, Part 10.5
    createdAt: {  
        type: Date, 
        default: new Date()
    },
    like_users_id: [mongoose.SchemaTypes.ObjectId]
});

const Card = mongoose.model('cards', cardSchema);

module.exports = Card;