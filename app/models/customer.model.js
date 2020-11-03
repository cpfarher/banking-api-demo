 /**
   * @swagger
   * definitions:
   *   Customer:
   *     type: object
   *     required:
   *       - name
   *     properties:
   *       id:
   *         type: integer
   *       name:
   *         type: string
   *         description: Name of the customer
   *         required: true
   *         unique: true
   *       passport:
   *         type: string
   *         required: false
   *         unique: true
   *         description: optional Passport of the customer
   */

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
