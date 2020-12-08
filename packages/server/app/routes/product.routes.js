module.exports = app => {
  const product = require("../controllers/product.controller.js");

  var router = require("express").Router();
  
  // Create a new product
  app.post("/api/product", product.create);

  // Retrieve all Categories
  app.get("/api/product/total", product.getTotalCount);

  // Retrieve all Categories
  app.get("/api/product", product.findAll);

  // Retrieve a single product with productId
  app.get("/api/product/:id", product.findOne);

  // Update a product with productId
  app.put("/api/product/:id", product.update);

  // Delete a product with productId
  app.delete("/api/product/:id", product.delete);

  // Create a new product
  app.delete("/api/product", product.deleteAll);

  //app.use('/api/product', router);
};
