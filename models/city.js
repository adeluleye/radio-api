const mongoose = require("mongoose");
const Joi = require("joi");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

const City = mongoose.model("City", citySchema);

function validateCity(city) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(city, schema);
}

module.exports.City = City;
module.exports.citySchema = citySchema;
module.exports.validateCity = validateCity;
