require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 6000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
