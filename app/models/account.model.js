/**
 * @swagger
 * definitions:
 *   Account:
 *     type: object
 *     required:
 *       -customerId
 *     properties:
 *       id:
 *         type: integer
 *       balance:
 *         type: decimal
 *         default: 0.0
 *         description: Optional balance for init the account
 *       description:
 *         type: string
 *         required: false
 *         description: Optional description of the account
 *       customerId:
 *         type: integer
 *         required: true
 *         description: Numeric ID of the customer to associate the account
 *         
 */
module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    balance: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        notNull: true,
        min: {
          args: [0],
          msg: "Balance must be greater or equal 0",
        },
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      min: 1,
      validate: {
        notNull: true,
      }
    },
  });

  return Account;
};
