const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.accounts = require("./account.model.js")(sequelize, Sequelize);
db.transfers = require("./transfer.model.js")(sequelize, Sequelize);

// customer - accounts association:
db.customers.hasMany(db.accounts, { as: "accounts" })
db.accounts.belongsTo(db.customers, {
  foreignKey: "customerId",
  as: "customer"
})

// accounts - transfers association:
db.transfers.belongsTo(db.accounts, {
  foreignKey: "fromAccountId",
  as: "accountFrom",
});
db.transfers.belongsTo(db.accounts, {
  foreignKey: "toAccountId",
  as: "accountTo"
})
db.accounts.hasMany(db.transfers, {
  foreignKey: "fromAccountId",
  as: "outgoingTransfer",
});
db.accounts.hasMany(db.transfers, {
  foreignKey: "toAccountId",
  as: "incomingTransfer",
});

module.exports = db;