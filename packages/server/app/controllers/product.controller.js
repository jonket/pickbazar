const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    slug: req.body.slug,
    unit: req.body.unit,
    price: req.body.price,
    sale_price: req.body.salePrice,
    discount_in_percent: req.body.discountInPercent,
    quantity: req.body.quantity,
    description: req.body.description,
    type: req.body.type,
    image: req.body.image,
    created_date: req.body.creation_date
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

// Retrieve the count of all Products from the database.
exports.getTotalCount = (req, res) => {
  Product.getTotalCount((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.getAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find the Products with the type, sort, search and offset
exports.findAll = (req, res) => {console.log(req.query)
  Product.findAll(req.query.type, req.query.sort, req.query.search, req.query.offset, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with the filters.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with the filters"
        });
      }
    } else res.send(data);
  });
};

// Find a single Product with a id
exports.findOne = (req, res) => {
  Product.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Product.updateById(
    req.params.id,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.id
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
