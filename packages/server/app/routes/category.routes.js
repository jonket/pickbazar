module.exports = app => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();
  
  // Create a new Category
  app.post("/api/category", category.create);

  // Retrieve all Categories
  app.get("/api/category", category.findAll);

  // Retrieve a single Category with categoryId
  app.get("/api/category/:categoryId", category.findOne);

  // Update a Category with categoryId
  app.put("/api/category/:categoryId", category.update);

  // Delete a Category with categoryId
  app.delete("/api/category/:categoryId", category.delete);

  // Create a new Category
  app.delete("/api/category", category.deleteAll);

  //app.use('/api/category', router);
};
