const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.name = category.name;
  this.slug = category.slug;
  this.type = category.type;
  this.icon = category.icon;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.getById = (categoryId, result) => {
  sql.query(`SELECT * FROM category WHERE id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category: ", res);
    result(null, res);
  });
};

Category.findAll = (type, searchBy, result) => {
  qstr = "SELECT * FROM category"
  if (type != "") {
    qstr += " WHERE type='" + type + "'"
    if (searchBy != "") {
      qstr += " AND name LIKE '%" + searchBy + "%'"
    }
  } else {
    if (searchBy != "") {
      qstr += " WHERE name LIKE '%" + searchBy + "%'"
    }
  }
  
  sql.query(qstr, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE category SET name = ?, slug = ?, category_id = ?, icon = ? WHERE id = ?",
    [category.name, category.slug, category.category_id, category.icon, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = result => {
  sql.query("DELETE FROM category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} category`);
    result(null, res);
  });
};

module.exports = Category;
