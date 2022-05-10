/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { NODE_ENV } = require('./config');
const swaggerDefinition = require('./config/swagger');

// Routers
const baseRouter = require('./api/routes');
const userRouter = require('./api/routes/users.routes');
const transactionRouter = require('./api/routes/transactions.routes');

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
if (NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('tiny'));
}

// Routes
app.use('/', baseRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', transactionRouter);

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

// error handler for 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Could not find the requested resource on the server!',
  });
});

module.exports = app;
