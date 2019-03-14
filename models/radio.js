const Joi = require('joi');
const mongoose = require('mongoose');

const Radio = mongoose.model('Radio', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
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
}));

function validateRadio(radio) {
    const schema = {
      name: Joi.string().min(5).max(255).required(),
      url: Joi.string().min(5).max(255).required(),
      frequency: Joi.string().min(3).max(255).required(),
      description: Joi.string().required()
    };
  
    return Joi.validate(radio, schema);
}

module.exports.Radio = Radio;
module.exports.validateRadio = validateRadio;