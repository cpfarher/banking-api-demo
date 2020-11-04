//@todo: no hardcode! pass to environment variables
const dbConfig = require("./config.js");

module.exports = {
  HOST: `${dbConfig.DB_HOST}`, // localhost when is local,db_postgres for production
  USER: `${dbConfig.DB_USER}`,
  PASSWORD: `${dbConfig.DB_PASSWORD}`,
  DB: `${dbConfig.DB_NAME}`,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
