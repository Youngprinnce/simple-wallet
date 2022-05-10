const baseRoute = require('../../config/router-config');

baseRoute.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'LendSqr E-wallet application service API',
}));

module.exports = baseRoute;
