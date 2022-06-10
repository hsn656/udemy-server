const joi = require("joi");

module.exports = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().uri().required(),
  tags: joi.array().items(joi.string()).default([]),
  price: joi.number().required(),
});
