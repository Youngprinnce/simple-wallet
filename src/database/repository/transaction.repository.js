const db = require('../connection');
const { TransactionModel } = require('../../api/models');
const { throwError } = require('../../utils');

module.exports = {
  // eslint-disable-next-line consistent-return
  transfer: async (credentials) => {
    try {
      const {
        sender, receiver, amount, newSenderBalance,
      } = credentials;

      const transId = await db.transaction(async (trx) => {
        const recipient = await db('users').where({ account_no: receiver }).first('account_no', 'balance');
        await trx('users').where({ account_no: sender }).update({ balance: newSenderBalance }).transacting(trx);
        await trx('users').where({ account_no: receiver }).update({ balance: parseFloat(recipient.balance) + parseFloat(amount) }).transacting(trx);
        const ids = await trx('transactions').insert({
          sender, receiver, amount,
        }).transacting(trx);
        return ids[0];
      });

      const transaction = await db('transactions').where({ id: transId }).first('id', 'sender', 'receiver', 'amount', 'created_at');
      return new TransactionModel(transaction);
    } catch (error) {
      throwError(error.message, 500);
    }
  },
};
