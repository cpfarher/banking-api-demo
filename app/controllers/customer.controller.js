const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }

    const customer = {
        name: req.body.name,
        passport: req.body.passport,
    };

    Customer.create(customer)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "There are some problem creating the Customer.",
        });
      });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Customer.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "There are some problem retreaving Customers",
        });
      });
};

exports.findOneWithAssociatedAccounts = (req, res) => {
  // wrapper for get accounts for a customer
  return this.findOne({ ...req, ...{ associatedAccounts: true } }, res);
}

// Find a single Customer with an id
exports.findOne = (req, res) => {
     const { associatedAccounts } = req;
     const { id } = req.params;

     const includes = associatedAccounts
       ? { include: ["accounts"] }
       : { };
       
     Customer.findByPk(id, includes)
       .then((data) => {
         res.send(data);
       })
       .catch((err) => {
         res.status(500).send({
           message: "Error retrieving Customer id=" + id,
         });
       });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
      const id = req.body.id;

      Customer.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Customer was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update customer with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Customer with id=" + id,
          });
        });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.body.id;

    Customer.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Customer was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Customer with id=" + id,
        });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Customers were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers.",
        });
      });
};