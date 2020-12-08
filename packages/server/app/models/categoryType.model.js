const sql = require("./db.js");

// constructor
const CategoryType = function(categoryType) {
  this.value = categoryType.value;
  this.name = categoryType.name;
};

CategoryType.findById = (categoryTypeId, result) => {
  sql.query(`SELECT * FROM category_type WHERE id = ${categoryTypeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category_type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found CategoryType with the id
    result({ kind: "not_found" }, null);
  });
};

CategoryType.getAll = result => {
  sql.query("SELECT * FROM category_type", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category_type: ", res);
    result(null, res);
  });
};

module.exports = CategoryType;
