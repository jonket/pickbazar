const Category = require("../models/category.model.js");

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Category
  const category = new Category({
    name: req.body.name,
    slug: req.body.slug,
    type: req.body.type,
    icon: req.body.icon
  });

  // Save Category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    else res.send(data);
  });
};

// Retrieve all Categories from the database.
exports.getAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    else res.send(data);
  });
};

// Find the Categories with the type and search
exports.findAll = (req, res) => {
  Category.findAll(req.query.type ? req.query.type : '', req.query.search ? req.query.search : '', (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with type ${req.params.type} and search ${req.params.search}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with type " + req.params.type + "and search " + req.params.search
        });
      }
    } else res.send(data);
  });
};

// Find a single Category with a categoryId
exports.findOne = (req, res) => {
  Category.getById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with id " + req.params.categoryId
        });
      }
    } else res.send(data);
  });
};

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Category.updateById(
    req.params.categoryId,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Category with id " + req.params.categoryId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Category with id " + req.params.categoryId
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
  Category.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categorys."
      });
    else res.send({ message: `All Categories were deleted successfully!` });
  });
};
