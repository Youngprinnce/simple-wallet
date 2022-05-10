/* eslint-disable max-len */
/* eslint-disable no-return-await */
const { userRepository } = require('../../database');

module.exports = {
  create: async (credentials) => await userRepository.createUser(credentials),

  findBy: async (credentials) => await userRepository.findBy(credentials),
};
