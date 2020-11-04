const db = require("../models");
const Account = db.accounts;
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new Account
exports.create = (req, res) => {
  const { balance, description, customerId } = req.body

  // Validate request
  if (!customerId) {
    res.status(400).send({
      message: "customerId can not be empty!",
    });
    return;
  }

  // check customer id exists
  Customer.findByPk(customerId).then((customer) => {
    if (!customer) {
      res.status(422).send({
        message: "Customer Id does not exists!",
      });
    }
    return;
  })

  const account = {
    balance: balance || 0.0, // initial balance
    description: description, // description
    customerId: customerId
  };

  Account.create(account)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "There are some problem creating the Account.",
      });
    });

};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description ? { description: { [Op.iLike]: `%${description}%` } } : null;

  Account.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "There are some problem retreaving Accounts",
      });
    });
};


exports.findOneWithAssociatedTransfers = (req, res) => {
  // wrapper for get accounts for a customer
  return this.findOne({ ...req, ...{ associatedTransfers: true } }, res);
};

// Find a single Account with an id
exports.findOne = (req, res) => {
  const { id } = req.params;
  const { associatedTransfers } = req;

  const includes = associatedTransfers
    ? { include: ["outgoingTransfer", "incomingTransfer"] }
    : {};

  Account.findByPk(id, includes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(422).send({
        message: "Error retrieving Account id=" + id,
      });
    });
};

// Update a Account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Account.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Account was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update account with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Account with id=" + id,
      });
    });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // @todo: not allow to delete accounts with transfers or not existent accounts
  Account.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Account was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Account with id=${id}. Maybe Account was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Account with id=" + id,
      });
    });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
  Account.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Accounts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accounts.",
      });
    });
};