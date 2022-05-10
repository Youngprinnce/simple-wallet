const { v4: uuidv4 } = require('uuid');
const UserService = require('../services/users.services');
const {
  jwtManager, sendSuccess, sendError, hashManager, throwError,
} = require('../../utils');
const { register } = require('../validations');

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
};
