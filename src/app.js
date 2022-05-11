/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { NODE_ENV } = require('./config');
const swaggerDefinition = require('./config/swagger');
const notFound = require('./api/middlewares/404');
const errorHandler = require('./api/middlewares/error');

// Routers
const baseRoutes = require('./api/routes');
const userRoutes = require('./api/routes/users.routes');
const transactionRoutes = require('./api/routes/transactions.routes');

// Create express app
const app = express();

const options = {
  swaggerDefinition,
  // path to the API docs
  apis: ['./src/docs/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('tiny'));
}

// Routes
app.use('/', baseRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', transactionRoutes);

// error handler
app.use(errorHandler);

// error handler for 404
app.use(notFound);

module.exports = app;
