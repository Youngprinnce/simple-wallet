const transactionRoute = require('../../config/router-config');
const transactionController = require('../controllers/transactions.controllers');
const authenticate = require('../middlewares/auth');

transactionRoute.post('/transactions/transfer', authenticate, transactionController.transfer);

module.exports = transactionRoute;
