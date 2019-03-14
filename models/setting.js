const Joi = require('joi');
const mongoose = require('mongoose');

const Setting = mongoose.model('Setting', new mongoose.Schema({
    app_name: {
        type: String,
        required: true,
    },
    app_logo: {
        type: String,
        required: true
    },
    app_fb_url: {
        type: String
    },
    app_twitter_url: {
        type: String
    },
    app_version: {
        type: String
    },
    app_author: {
        type: String
    },
    app_contact: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    app_email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    app_website_url: {
        type: String
    },
    app_description: {
        type: String
    },
    app_developed_by: {
        type: String
    },
    app_privacy_policy: {
        type: String
    }
}));

function validateSetting(setting) {
    const schema = {
      app_name: Joi.string().required(),
      app_fb_url: Joi.string(),
      app_twitter_url: Joi.string(),
      app_version: Joi.string(),
      app_author: Joi.string(),
      app_contact: Joi.string().min(5).max(50),
      app_email: Joi.string().min(5).max(255).email(),
      app_website_url: Joi.string(),
      app_description: Joi.string(),
      app_developed_by: Joi.string(),
      app_privacy_policy: Joi.string(),
    };
  
    return Joi.validate(setting, schema);
}

module.exports.Setting = Setting;
module.exports.validateSetting = validateSetting;