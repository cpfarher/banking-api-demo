//@todo: no hardcode! pass to environment variables

module.exports = {
  HOST: "db_postgres", // localhost when is local,db_postgres for production
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "banking",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
