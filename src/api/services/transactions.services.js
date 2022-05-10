const { transactionRepository } = require('../../database');

module.exports = {
  // eslint-disable-next-line no-return-await
  transfer: async (credentials) => await transactionRepository.transfer(credentials),
};
