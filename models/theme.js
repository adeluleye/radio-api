const Joi = require('joi');
const mongoose = require('mongoose');

const Theme = mongoose.model('Theme', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    color1: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7
    },
    color2: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7
    }
}));

function validateTheme(theme) {
    const schema = {
      name: Joi.string().min(3).max(255).required(),
      color1: Joi.string().min(7).max(7).required(),
      color2: Joi.string().min(7).max(7).required()
    };
  
    return Joi.validate(theme, schema);
}

module.exports.Theme = Theme;
module.exports.validateTheme = validateTheme;