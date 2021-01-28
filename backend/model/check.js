const Joi = require('joi');

const signupValidn = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

const loginValidn = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(), 
    })

module.exports.signupValidn = signupValidn;
module.exports.loginValidn = loginValidn;