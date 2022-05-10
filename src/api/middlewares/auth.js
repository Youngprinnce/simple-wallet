const { jwtManager, throwError, sendError } = require('../../utils');

// eslint-disable-next-line consistent-return
const authenticate = async (req, res, next) => {
  try {
    const requestHeaderAuthorization = req.headers.authorization;

    if (!requestHeaderAuthorization) throwError('Authentication Failed. Please login', 401);

    const [authBearer, token] = requestHeaderAuthorization.split(' ');

    if (authBearer !== 'Bearer') throwError('Authentication Failed, Bearer token missing', 400);

    const data = await jwtManager().verify(token);
    req.auth = data;
    next();
  } catch (error) {
    return sendError(res, error.message, error.statusCode);
  }
};

module.exports = authenticate;
