const Joi = require("joi");


const validateTravelPlan = (price, startDate, duration, res) => {
    const validationTourSchema = Joi.object({
        price: Joi.string().regex(/^\$[0-9]+(\.[0-9]{2})?$/).required(),
        startDate: Joi.date().iso().required().messages({
            'date.base': 'Invalid date format', 
            'date.iso': 'Invalid date format',
            'any.required': 'Date is required',
          }),
        duration: Joi.number().integer().required()
    });
    
    const { error, value } = validationTourSchema.validate({price, startDate, duration});
    
    if (error) {
        // Handle validation error
        return res.status(400).json({error: error.details[0].message});
    }
};

const validateTour = (name, price, startDate, duration, res) => {
    const validationTourSchema = Joi.object({
        name: Joi.string().required().min(3).max(20),
        price: Joi.string().regex(/^\$[0-9]+(\.[0-9]{2})?$/).required(),
        startDate: Joi.date().iso().required().messages({
            'date.base': 'Invalid date format',
            'date.iso': 'Invalid date format',
            'any.required': 'Date is required',
          }),
        duration: Joi.number().integer().required()
    });
    
    const { error, value } = validationTourSchema.validate({name, price, startDate, duration});
    
    if (error) {
        // Handle validation error
        return res.status(400).json({error: error.details[0].message});
    }
}

module.exports = {
    validateTour,
    validateTravelPlan,
};

