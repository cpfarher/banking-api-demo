module.exports = (app) => {
  const transfers = require("../controllers/transfer.controller.js");

  var router = require("express").Router();

  // Create a new Transfer
  /**
   * @swagger
   * /transfers:
   *  post:
   *    summary: Create a transfer
   *    tags:
   *      - Transfer
   *    consumes:
   *      - application/json
   *      - application/x-www-form-urlencoded
   *    parameters:
   *      - in: body
   *        name: transfer
   *        description: Do a transfer.
   *        schema:
   *          type: object
   *          required:
   *            - fromAccountId
   *            - toAccountId
   *            - amount
   *          properties:
   *            fromAccountId:
   *              type: integer
   *              required: true
   *              description: Numeric ID of the outgoing money
   *            toAccountId:
   *              type: integer
   *              required: true
   *              description: Numeric ID of account that received money
   *            amount:
   *              type: number
   *              required: false
   *              default: 0.1
   *              description: amount to transfer from account with account id {fromAccountId} to account with id {toAccountId}
   *            description:
   *              type: string
   *              required: false
   *              description: Optional description for the transfer
   *    responses:
   *      '200':
   *        description: A successful response
   *      '400':
   *        description: Bad Request
   *      '422':
   *        description: Unprocessable Entity
   *      '500':
   *        description: A problem occurred in the server
   */
  router.post("/", transfers.create);

  /**
   * @swagger
   * /transfers:
   *
   *  get:
   *    summary: Retrieve all Transfers
   *    tags:
   *      - Transfer
   *    responses:
   *      '200':
   *        description: A successful response
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/", transfers.findAll);

  // Retrieve a single transfer with id
  /**
   * @swagger
   * /customers/{transferId}:
   *  get:
   *    summary: Retrieve a single transfer with id
   *    tags:
   *      - Transfer
   *    parameters:
   *      - in: path
   *        name: transferId
   *        type: integer
   *        required: true
   *        description: Numeric ID of the transfer to get
   *    responses:
   *      '200':
   *        description: A successful response
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/:id", transfers.findOne);

  // Update a transfer with id
  router.put("/:id", transfers.update);

  // Delete a transfer with id
  router.delete("/:id", transfers.delete);

  // Delete all transfers
  router.delete("/", transfers.deleteAll);

  app.use("/transfers", router);
};
