module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    name: {
      type: Sequelize.STRING,
    },
    passport: {
      type: Sequelize.STRING,
    },
  });

  return Customer;
};
