const Joi = require('joi');

module.exports.newUser = Joi.object({
    name: Joi.string().required().min(2).max(70),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    biz: Joi.boolean()
});

module.exports.auth = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
});
