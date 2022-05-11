const { jwtManager, throwError, sendError } = require('../../utils');
const { userRepository } = require('../../database');

// eslint-disable-next-line consistent-return
const authenticate = async (req, res, next) => {
  try {
    const requestHeaderAuthorization = req.headers.authorization;

    if (!requestHeaderAuthorization) throwError('Authentication Failed. Please login', 401);

    const [authBearer, token] = requestHeaderAuthorization.split(' ');

    if (authBearer !== 'Bearer') throwError('Authentication Failed, Bearer token missing', 401);

    const { userId, ...rest } = await jwtManager().verify(token);

    const userExist = await userRepository.findBy({ id: userId });

    if (!userExist) throwError('Authentication Failed, User not found', 401);

    req.auth = { ...rest, userId };
    next();
  } catch (error) {
    return sendError(res, error.message, error.statusCode);
  }
};

module.exports = authenticate;
