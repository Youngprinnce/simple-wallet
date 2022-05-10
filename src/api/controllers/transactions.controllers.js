const TransactionService = require('../services/transactions.services');
const UserService = require('../services/users.services');
const { sendSuccess, sendError, throwError } = require('../../utils');
const { transfer } = require('../validations');

module.exports = {
  transfer: async (req, res) => {
    try {
      await transfer.validateAsync(req.body);
      const { userId } = req.auth;
      const { amount } = req.body;

      const user = await UserService.findBy({ id: userId });

      if (!user) throwError('User not found', 404);

      const { balance } = user;

      if (parseFloat(amount) > parseFloat(balance)) throwError('Insufficient balance', 400);

      const newSenderBalance = balance - amount;

      req.body.sender = user.account_no;
      req.body.newSenderBalance = newSenderBalance;

      const transaction = await TransactionService.transfer(req.body);
      return sendSuccess(res, transaction, 'Transaction successfull', 201);
    } catch (error) {
      if (error.isJoi === true) return sendError(res, error.details[0].message, 422);
      return sendError(res, error.message, error.statusCode);
    }
  },
};
