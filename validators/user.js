const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required().min(2).max(70),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    biz: Joi.boolean()
});