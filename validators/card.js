const Joi = require('joi');

// Validation on Server Side newCard
// Note: Must include all recieved fields !!!!!!
// Task, Part 10.3
module.exports.newCard = Joi.object({
    companyName: Joi.string().required().min(2).max(100),
    companyDescription: Joi.string(),
    companyAddress: Joi.string(),
    companyPhoneNumber: Joi.string().required().min(13).max(14),
    companyImageUrl: Joi.string()
});