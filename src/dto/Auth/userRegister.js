const joi = require("joi");

module.exports = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  image: joi.string().uri().default("https://via.placeholder.com/150"),
});
