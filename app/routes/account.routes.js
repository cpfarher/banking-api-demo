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

  /**
   * @swagger
   * /accounts:
   *
   *  get:
   *    summary: Retrieve all Accounts
   *    tags:
   *      - Account
   *    responses:
   *      '200':
   *        description: A successful response
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/", accounts.findAll);

  /**
   * @swagger
   * /accounts/{accountId}:
   *  get:
   *    summary: Retrieve a single Account with id
   *    tags:
   *      - Account
   *    parameters:
   *      - in: path
   *        name: accountId
   *        type: integer
   *        required: true
   *        description: Numeric ID of the account to get
   *    responses:
   *      '200':
   *        description: A successful response
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/:id", accounts.findOne);

  /**
   * @swagger
   * /accounts/{customerId}/transfers:
   *  get:
   *    summary: Retrieve an account with owns associated incoming and outgoing transfers
   *    tags:
   *      - Account
   *    parameters:
   *      - in: path
   *        name: customerId
   *        type: integer
   *        required: true
   *        description: Numeric ID of the account to get
   *    responses:
   *      '200':
   *        description: A successful response
   *      '400':
   *        description:
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/:id/transfers", accounts.findOneWithAssociatedTransfers);

  // Update a Account with id
  router.put("/:id", accounts.update);

  // Delete a Account with id
  router.delete("/:id", accounts.delete);

  // Delete all Accounts
  router.delete("/", accounts.deleteAll);

  app.use("/accounts", router);
};
