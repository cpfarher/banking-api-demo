module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customers.create);

  /**
   * @swagger
   * /customers:
   *
   *  get:
   *    summary: Retrieve all Customers
   *    tags:
   *      - Customer
   *    responses:
   *      '200':
   *        description: A successful response
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/", customers.findAll);

  /**
   * @swagger
   * /customers/{customerId}:
   *  get:
   *    summary: Retrieve a single Customer with id
   *    tags:
   *      - Customer
   *    parameters:
   *      - in: path
   *        name: customerId
   *        type: integer
   *        required: true
   *        description: Numeric ID of the customer to get
   *    responses:
   *      '200':
   *        description: A successful response
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/:id", customers.findOne);

  /**
   * @swagger
   * /customers/{customerId}/accounts:
   *  get:
   *    summary: Retrieve a single Customer with id with it's account associated
   *    tags:
   *      - Customer
   *    parameters:
   *      - in: path
   *        name: customerId
   *        type: integer
   *        required: true
   *        description: Numeric ID of the customer to get
   *    responses:
   *      '200':
   *        description: A successful response
   *      '400':
   *        description:
   *      '500':
   *        description: A problem occurred in the server
   */
  router.get("/:id/accounts", customers.findOneWithAssociatedAccounts);

  // Update a Customer with id
  router.put("/:id", customers.update);

  // Delete a Customer with id
  router.delete("/:id", customers.delete);

  // Delete all Customers
  router.delete("/", customers.deleteAll);

  app.use("/customers", router);
};

