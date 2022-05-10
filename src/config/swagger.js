const { BASE_URL } = require('.');

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: '',
    version: '1.0.0',
    description: '',
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
