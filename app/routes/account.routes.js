module.exports = (app) => {
  const accounts = require("../controllers/account.controller.js");

  var router = require("express").Router();

  // Create a new Account
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

  app.use("/api/accounts", router);
};
