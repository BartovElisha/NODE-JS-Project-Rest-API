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

// Task, Part 11.3
module.exports.updateCard = Joi.object({
    _id: Joi.string().required(),
    companyName: Joi.string().min(2).max(100),
    companyDescription: Joi.string(),
    companyAddress: Joi.string(),
    companyPhoneNumber: Joi.string().min(13).max(14),
    companyImageUrl: Joi.string()
});

// Task, Part 13.2
module.exports.updateLikes = Joi.object({
    like_users_id: Joi.array().items(Joi.string()).required()
});