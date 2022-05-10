const jwt = require('jsonwebtoken');

// custom function to sign and verify token using jwt
module.exports = {
  jwtManager() {
    return {
      async sign(data) {
        return jwt.sign(data, 'dotun', { expiresIn: '24h' });
      },
      async verify(token) {
        return jwt.verify(token, 'dotun');
      },
    };
  },
};
