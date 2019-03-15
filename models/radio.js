const Joi = require('joi');
const mongoose = require('mongoose');
const { citySchema } = require('./city');

Joi.objectId = require('joi-objectid')(Joi);

const Radio = mongoose.model('Radio', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    city: {
        type: citySchema,
        required: true
    },
    url: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    frequency: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    image: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Number,
        max: 1,
        default: 0
    }
}));

function validateRadio(radio) {
    const schema = {
      name: Joi.string().min(5).max(255).required(),
      cityId: Joi.objectId().required(),
      url: Joi.string().min(5).max(255).required(),
      frequency: Joi.string().min(3).max(255).required(),
      description: Joi.string().required(),
      isFeatured: Joi.number().max(1)
    };
  
    return Joi.validate(radio, schema);
}

module.exports.Radio = Radio;
module.exports.validateRadio = validateRadio;