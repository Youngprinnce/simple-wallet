const { v4: uuidv4 } = require('uuid');
const UserService = require('../services/users.services');
const {
  jwtManager, sendSuccess, sendError, hashManager, throwError,
} = require('../../utils');
const { register, login, amountSchema } = require('../validations');

module.exports = {
  createUser: async (req, res) => {
    try {
      await register.validateAsync(req.body);
      const { email, password } = req.body;

      const userExists = await UserService.findBy({ email });

      if (userExists) throwError('User already exists', 409);

      const hashedPassword = await hashManager().hash(password);

      req.body.password = hashedPassword;
      req.body.account_no = uuidv4();

      const user = await UserService.create(req.body);

      const token = await jwtManager().sign({ email, userId: user.id });

      return sendSuccess(res, { token, user }, 'User created successfully', 201);
    } catch (error) {
      if (error.isJoi === true) return sendError(res, error.details[0].message, 422);
      return sendError(res, error.message, error.statusCode || 500);
    }
  },

  loginUser: async (req, res) => {
    try {
      await login.validateAsync(req.body);
      const { email, password } = req.body;

      const userExists = await UserService.findBy({ email });

      if (!userExists) throwError('User not found', 404);

      const isValid = await hashManager().compare(password, userExists.password);

      if (!isValid) throwError('Invalid password', 401);

      const token = await jwtManager().sign({ email, userId: userExists.id });

      return sendSuccess(res, { token, user: userExists }, 'User logged in successfully', 200);
    } catch (error) {
      if (error.isJoi === true) return sendError(res, error.details[0].message, 422);
      return sendError(res, error.message, error.statusCode || 500);
    }
  },

  deposit: async (req, res) => {
    try {
      await amountSchema.validateAsync(req.body.amount);
      const { amount } = req.body;
      const { userId } = req.auth;

      const user = await UserService.findBy({ id: userId });

      if (!user) throwError('User not found', 404);

      const newBalance = parseFloat(user.balance) + parseFloat(amount);

      const updatedUser = await UserService.updateBalance({ id: userId }, { balance: newBalance });
      return sendSuccess(res, updatedUser, 'Deposit successful', 200);
    } catch (error) {
      console.log(error);
      if (error.isJoi === true) return sendError(res, error.details[0].message, 422);
      return sendError(res, error.message, error.statusCode || 500);
    }
  },

  withdraw: async (req, res) => {
    try {
      await amountSchema.validateAsync(req.body.amount);
      const { amount } = req.body;
      const { userId } = req.auth;

      const user = await UserService.findBy({ id: userId });

      if (!user) throwError('User not found', 404);

      const { balance } = user;

      if (parseFloat(balance) < parseFloat(amount)) throwError('Insufficient balance', 400);

      const newBalance = parseFloat(user.balance) - parseFloat(amount);

      const updatedUser = await UserService.updateBalance({ id: userId }, { balance: newBalance });
      return sendSuccess(res, updatedUser, 'Withdrawal successful', 200);
    } catch (error) {
      if (error.isJoi === true) return sendError(res, error.details[0].message, 422);
      return sendError(res, error.message, error.statusCode);
    }
  },
};
