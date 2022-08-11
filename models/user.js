const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define MongoDb User Schema
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
    }},
    {
        methods:{
            async checkPassword(password){
                return await bcrypt.compare(password, this.password);
            },
            getToken() {
                return jwt.sign({id:this._id,biz:this.biz}, process.env.JWT_PASSWORD);
            }
        }
    }
);

const User = mongoose.model('users', userSchema);

module.exports = User;