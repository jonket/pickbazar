module.exports = app => {
  const categoryType = require("../controllers/categorytype.controller.js");

  var router = require("express").Router();
  
  app.post("/api/categorytype", categoryType.create);

  app.get("/api/categorytype", categoryType.findAll);

  app.get("/api/categorytype/:id", categoryType.findOne);

  app.put("/api/categorytype/:id", categoryType.update);

  app.delete("/api/categorytype/:id", categoryType.delete);

  app.delete("/api/categorytype", categoryType.deleteAll);

  //app.use('/api/categorytype', router);
};
