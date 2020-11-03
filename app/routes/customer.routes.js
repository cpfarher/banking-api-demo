module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customers.create);

  /**
   * @swagger
   * /customers:
   *  get:
   *    description: Retrieve all Customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
  router.get("/", customers.findAll);

  /**
   * @swagger
   * /customers/:id:
   *  get:
   *    description: Retrieve a single Customer with id
   *    responses:
   *      '200':
   *        description: A successful response
   */
  router.get("/:id", customers.findOne);

  // Retrieve accounts for a Customer with id
  router.get("/:id/accounts", customers.findOneWithAssociatedAccounts);

  // Update a Customer with id
  router.put("/:id", customers.update);

  // Delete a Customer with id
  router.delete("/:id", customers.delete);

  // Delete all Customers
  router.delete("/", customers.deleteAll);

  app.use("/customers", router);
};
