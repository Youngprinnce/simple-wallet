const userRoute = require('../../config/router-config');
const userController = require('../controllers/users.controllers');

userRoute.post('/users/register', userController.createUser);

module.exports = userRoute;
