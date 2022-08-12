const Joi = require('joi');


// Validation on Server Side newUser
// Task Part 4.3
module.exports.newUser = Joi.object({
    name: Joi.string().required().min(2).max(70),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    biz: Joi.boolean()
});

// Validation on Server Side authorization
// Task Part 5.1
module.exports.auth = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
});