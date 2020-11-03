const db = require("../models");
const Transfer = db.transfers;
const Op = db.Sequelize.Op;
import _ from 'lodash'
// Create and Save a new transfer
exports.create = (req, res) => {
  // Validate request
  
  // @todo: check rules for validate transfer!
  // check transfer from and transfer to account exists
  // 
  if (!req.body.amount && _.isFinite(req.body.amount)) {
    res.status(400).send({
      message: "Amount can not be empty!",
    });
    return;
  }
  
    const transfer = {
        // ip: req.body.ip,
        description: req.body.description,
        amount: Math.abs(amount),
        fromAccountId: fromAccountId,
        toAccountId: toAccountId,
    };

    Transfer.create(transfer)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "There are some problem creating the Transfer.",
        });
      });

};

// Retrieve all Transfers from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Transfer.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "There are some problem retreaving Transfers",
        });
      });
};

exports.findOneWithAssociatedAccounts = (req, res) => {
  // wrapper for get accounts for a transfer
  return this.findOne({ ...req, ...{ associatedAccounts: true } }, res);
}

// Find a single Transfer with an id
exports.findOne = (req, res) => {
     const { associatedAccounts } = req;
     const { id } = req.params;

     const includes = associatedAccounts
       ? { include: ["accounts"] }
       : { };
       
     Transfer.findByPk(id, includes)
       .then((data) => {
         res.send(data);
       })
       .catch((err) => {
         res.status(500).send({
           message: "Error retrieving Transfer id=" + id,
         });
       });
};

// Update a Transfer by the id in the request
exports.update = (req, res) => {
      const id = req.body.id;

      Transfer.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Transfer was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update transfer with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Transfer with id=" + id,
          });
        });
};

// Delete a Transfer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.body.id;

    Transfer.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Transfer was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Transfer with id=${id}. Maybe Transfer was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Transfer with id=" + id,
        });
      });
};

// Delete all Transfers from the database.
exports.deleteAll = (req, res) => {
    Transfer.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Transfers were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Transfers.",
        });
      });
};