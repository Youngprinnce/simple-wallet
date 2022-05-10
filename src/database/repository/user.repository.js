/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const db = require('../connection');
const { UserModel } = require('../../api/models');
const { throwError } = require('../../utils');

module.exports = {
  createUser: async (credentials) => {
    const user = await db('users').insert(credentials).then((id) => db('users').where({ id }).first('id', 'email', 'firstname', 'lastname', 'balance', 'account_no'));
    return new UserModel(user);
  },

  async findBy(credentials) {
    const user = await db('users').where(credentials).first('id', 'email', 'firstname', 'lastname', 'balance', 'password', 'account_no');
    if (user) {
      return new UserModel(user);
    }
    return null;
  },
};
