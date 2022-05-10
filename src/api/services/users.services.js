/* eslint-disable max-len */
/* eslint-disable no-return-await */
const { userRepository } = require('../../database');

module.exports = {
  create: async (credentials) => await userRepository.createUser(credentials),

  findBy: async (credentials) => await userRepository.findBy(credentials),

  updateBalance: async (filter, credentials) => await userRepository.updateBalance(filter, credentials),

  // eslint-disable-next-line camelcase
  myTransactions: async (account_no) => await userRepository.myTransactions(account_no),
};
