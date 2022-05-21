require('dotenv').config();

module.exports = {
  development: {
    port: process.env.PORTBD || 3306,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'register',
    host: process.env.HOSTNAME || 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'register',
    host: process.env.HOSTNAME || 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'register',
    host: process.env.HOSTNAME || 'localhost',
    dialect: 'mysql',
  },
};
