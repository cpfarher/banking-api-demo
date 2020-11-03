module.exports = (app) => {
  const transfers = require("../controllers/transfer.controller.js");

  var router = require("express").Router();

  // Create a new Account
  router.post("/", transfers.create);

  // Retrieve all transfers
  router.get("/", transfers.findAll);

  // Retrieve a single Account with id
  router.get("/:id", transfers.findOne);

  // Update a Account with id
  router.put("/:id", transfers.update);

  // Delete a Account with id
  router.delete("/:id", transfers.delete);

  // Delete all transfers
  router.delete("/", transfers.deleteAll);

  app.use("/api/transfers", router);
};
