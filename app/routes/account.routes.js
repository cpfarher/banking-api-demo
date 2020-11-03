module.exports = (app) => {
  const accounts = require("../controllers/account.controller.js");

  var router = require("express").Router();

  // Create a new Account
  /**
   * @swagger
   * /accounts:
   *  post:
   *    summary: Create a new bank account associated to customer
   *    tags:
   *      - Account
   *    consumes:
   *      - application/json
   *      - application/x-www-form-urlencoded
   *    parameters:
   *      - in: body
   *        name: account
   *        description: The user to create.
   *        schema:
   *          type: object
   *          required:
   *            - customerId
   *          properties:
   *            customerId:
   *              type: integer
   *              required: true
   *              description: Numeric ID of the customer to associate the account
   *            balance:
   *              type: number
   *              required: false
   *              default: 0.0
   *              description: Optional balance for init the account
   *            description:
   *              type: string
   *              required: false
   *              description: Optional description of the account
   *    responses:
   *      '200':
   *        description: A successful response
   *      '400':
   *        description:
   *      '500':
   *        description: A problem occurred in the server
   */
  router.post("/", accounts.create);

  // Retrieve all Accounts
  router.get("/", accounts.findAll);

  // Retrieve a single Account with id
  router.get("/:id", accounts.findOne);

  // Update a Account with id
  router.put("/:id", accounts.update);

  // Delete a Account with id
  router.delete("/:id", accounts.delete);

  // Delete all Accounts
  router.delete("/", accounts.deleteAll);

  app.use("/accounts", router);
};
