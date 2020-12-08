const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.name = product.name;
  this.slug = product.slug;
  this.unit = product.unit;
  this.price = product.price;
  this.sale_price = product.sale_price;
  this.discount_in_percent = product.discount_in_percent;
  this.quantity = product.quantity;
  this.description = product.description;
  this.type = product.type;
  this.image = product.image;
  this.created_date = product.created_date;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM product WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getTotalCount = result => {
  sql.query("SELECT count(*) AS total FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product: ", res);
    result(null, res);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product: ", res);
    result(null, res);
  });
};

Product.findAll = (type, sort, search, offset, result) => {
  qstr = "SELECT * FROM product"
  if (type != "") {
    qstr += " WHERE type='" + type + "'"
    if (search != "") {
      qstr += " AND name LIKE '%" + search + "%'"
    }
  } else {
    if (search != "") {
      qstr += " WHERE name LIKE '%" + search + "%'"
    }
  }
  
  if (sort != "") {
    if (sort == 'highestToLowest') {
      qstr += " Order By price DESC"
    } else if (sort == 'lowestToHighest') {
      qstr += " Order By price ASC"
    }
  }

  if (offset != "" && offset > 0) {
    qstr += " LIMIT 0, " + offset
  }
  
  sql.query(qstr, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("product: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE product SET name = ?, slug = ?, unit = ?, price = ?, sale_price = ?, discount_in_percent = ?, quantity = ?, description = ?, type = ?, image = ?, created_date = ? WHERE id = ?",
    [product.name, product.slug, product.unit, product.price, product.sale_price, product.discount_in_percent, product.quantity, product.description, product.type, product.image, product.created_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} product`);
    result(null, res);
  });
};

module.exports = Product;
