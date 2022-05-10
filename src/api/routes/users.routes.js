const userRoute = require('../../config/router-config');
const userController = require('../controllers/users.controllers');
const authenticate = require('../middlewares/auth');

userRoute.post('/users/register', userController.createUser);
userRoute.post('/users/login', userController.loginUser);
userRoute.post('/users/deposit', authenticate, userController.deposit);
userRoute.post('/users/withdraw', authenticate, userController.withdraw);

module.exports = userRoute;
