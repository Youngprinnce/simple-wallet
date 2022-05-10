const { transfer } = require('./transactions.validations');
const { register, login, amountSchema } = require('./users.validations');

module.exports = {
  register,
  login,
  amountSchema,
  transfer,
};
