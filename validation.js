const Joi = require('joi');

//Register validation 

let invoice = Joi.object().keys({
    invoiceTitle: Joi.string().required().min(4),
    invoiceDate: Joi.string().required().min(10),
    invoiceAuthor: Joi.string().required().min(1),
    invoiceDateTo: Joi.string().required().min(10)
})

const registerValidation = data => {
    
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
    
        email: Joi.string()
        .min(6).email(),

        phone: Joi.string()
        .min(9).max(20).required(),
        
        invoices: Joi.array().items(invoice),

        password: Joi.string()
        .min(6).required(),
    
    })    

    return schema.validate(data, {abortEarly: false}, schema);

}


// Login validation

const loginValidation = data => {
    
    const schema = Joi.object({

        email: Joi.string()
        .min(6).email(),

        password: Joi.string()
        .min(6).required(),
    
    })    

    return schema.validate(data, {abortEarly: false}, schema);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;