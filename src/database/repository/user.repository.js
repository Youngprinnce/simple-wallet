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
      const transactions = await this.myTransactions(user.account_no);
      user.transactions = transactions;
      return new UserModel(user);
    }
    return null;
  },

  myTransactions: async (account_no, limit = 5) => {
    const transactions = await db('transactions')
      .join('users', 'users.account_no', '=', 'transactions.receiver')
      .where({ sender: account_no })
      .select('users.firstname', 'users.lastname', 'transactions.id', 'transactions.amount', 'transactions.created_at')
      .orderBy('transactions.created_at', 'desc')
      .limit(limit);
    return transactions;
  },

  // eslint-disable-next-line consistent-return
  updateBalance: async (filter, credentials) => {
    const rows = await db.transaction(async (trx) => await db('users').where(filter).update(credentials).transacting(trx));
    if (rows > 0) {
      const details = await db('users').where(filter).first('id', 'firstname', 'lastname', 'balance', 'account_no');
      return details;
    }
    throwError('User not found', 404);
  },
};
