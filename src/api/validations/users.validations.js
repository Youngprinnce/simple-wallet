const Joi = require('joi');

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = 'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length';

const register = Joi.object().keys({
  email: Joi.string().email().required().trim()
    .lowercase(),
  password: Joi.string().regex(strongPasswordRegex).required().messages({
    'string.empty': 'Password is required',
    'string.pattern.base': stringPassswordError,
  }),
  firstname: Joi.string().required().max(50).min(2),
  lastname: Joi.string().required().max(50).min(2),
});

const login = Joi.object().keys({
  email: Joi.string().email().required().trim()
    .lowercase(),
  password: Joi.string().required(),
});

module.exports = {
  register,
  login,
};
