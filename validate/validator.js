const Joi = require("joi")

const addContactValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const validateBody = schema =>{
    return (req,res,next)=>{
        const {error} = schema.validate(req.body);
        if (error){
            next(res.status(400).json({"message":"missing required field"}))
        }
        next()
    }
}

module.exports = {
    validateBody,
    addContactValidationSchema,
};