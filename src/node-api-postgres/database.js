const Sequelize = require("sequelize");

DATABASE_URL = "postgres://[username]:[password]localhost:7000/[dbName]";

const database = new Sequelize(DATABASE_URL);

module.exports = database;
