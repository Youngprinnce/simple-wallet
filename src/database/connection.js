const knex = require('knex');
const { NODE_ENV } = require('../config');
const dbConfig = require('./knexfile');

let db = null;

if (NODE_ENV === 'test') {
  db = knex(dbConfig.test);
} else {
  db = knex(dbConfig.development);
}

module.exports = db;
