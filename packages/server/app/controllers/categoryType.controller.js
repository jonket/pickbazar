const CategoryType = require("../models/categoryType.model.js");

// Create and Save a new CategoryType
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a CategoryType
  const categoryType = new CategoryType({
    value: req.body.value,
    name: req.body.name
  });

  // Save CategoryType in the database
  CategoryType.create(categoryType, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CategoryType."
      });
    else res.send(data);
  });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  CategoryType.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categoryTypes."
      });
    else res.send(data);
  });
};

// Find a single CategoryType with a id
exports.findOne = (req, res) => {
  CategoryType.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CategoryType with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving CategoryType with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a CategoryType identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  CategoryType.updateById(
    req.params.id,
    new CategoryType(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CategoryType with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating CategoryType with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a CategoryType with the specified id in the request
exports.delete = (req, res) => {
  CategoryType.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CategoryType with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete CategoryType with id " + req.params.id
        });
      }
    } else res.send({ message: `CategoryType was deleted successfully!` });
  });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
  CategoryType.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categoryTypes."
      });
    else res.send({ message: `All Categories were deleted successfully!` });
  });
};
