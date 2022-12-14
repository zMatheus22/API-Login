const Joi = require("@hapi/joi");

const registerValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(40),
    email: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(6).max(200),
  });

  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(6).max(200),
  });

  return schema.validate(data);
};

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;