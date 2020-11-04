/**
* @swagger
* definitions:
*   Transfer:
*     type: object
*     required:
*       -fromAccountId
*       -toAccountId
*       -amount
*     properties:
*       id:
*         type: integer
*       amount:
*         type: decimal
*         description: Amount to transfer from account with id fromAccountId to account with id toAccountId
*       description:
*         type: string
*         required: false
*         description: Optional description for the transfer
*       fromAccountId:
*         type: integer
*         required: true
*         description: Numeric ID of the outgoing account
*       toAccountId:
*         type: integer
*         required: true
*         description: Numeric ID of the incoming account
*/
module.exports = (sequelize, Sequelize) => {
  const Transfer = sequelize.define("transfer", {
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      set(value) {
        this.setDataValue('amount', Math.abs(value))
      }
    },
    description: {
      type: Sequelize.STRING,
    },
    /*fromAccountId: {
      type: Sequelize.INTEGER,

      references: {
        // This is a reference to another model
        model: Account,

        // This is the column name of the referenced model
        key: "id",

        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      },
    },*/
    /*,
   toAccountId: {
     type: Sequelize.INTEGER,

     references: {
       // This is a reference to another model
       model: Account,

       // This is the column name of the referenced model
       key: "id",

       // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
       deferrable: Deferrable.INITIALLY_IMMEDIATE,
       // Options:
       // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
       // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
       // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
     },
   },*/
  });

  return Transfer;
};
