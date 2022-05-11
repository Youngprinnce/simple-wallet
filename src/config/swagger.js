const { BASE_URL } = require('.');

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Simple Wallet API',
    version: '1.0.0',
    description: 'Simple Wallet API',
    contact: {
      name: 'API Support',
      email: 'ajiboyeadedotun16@gmail.com',
    },
  },
  servers: [
    {
      url: `${BASE_URL}/api/v1`,
      description: 'Development server',
    },
  ],
};

module.exports = swaggerDefinition;
