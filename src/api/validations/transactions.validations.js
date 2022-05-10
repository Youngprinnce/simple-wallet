const Joi = require('joi');

const transfer = Joi.object().keys({
  amount: Joi.string().required(),
  receiver: Joi.string().required(),
});

module.exports = {
  transfer,
};
