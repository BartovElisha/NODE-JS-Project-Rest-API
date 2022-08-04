const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is wrong.');   
            }
        }},
    password: {
        type: String, 
        required: true
    },
    biz: {
        type: Boolean, 
        default: false
    },
    createdAt: {
        type: Date, 
        default: new Date()
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;