var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

const pool = mysql.createPool({ 
  host: "localhost",
  user: "root",
  password: "",
  database: "medstore"
});

/** 
 * run this before first USAGE to create drugs TABLE
 */
router.get("/install", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS drugs (id INT NOT NULL AUTO_INCREMENT, drugName TEXT NOT NULL, category TEXT NOT NULL, expirationDay TEXT NOT NULL, link TEXT NOT NULL, amount TEXT NOT NULL, PRIMARY KEY (id)) ENGINE = InnoDB;
    `;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();
      res.redirect("/");
    });
  });
});

router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `SELECT * FROM drugs`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();
      res.json(results);
    });
  });
});

router.get("/expired", function (req, res, next) {
const datetime = new Date().toISOString().split('T')[0];

console.log("DATE -> ", datetime);

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `SELECT * FROM drugs WHERE expirationDay <= '${datetime}'`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();

      console.log("RESULT -> ", results);
      res.json(results);
    });
  });
});

router.get("/unexpired", function (req, res, next) {
  const datetime = new Date().toISOString().split('T')[0];
  
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      const sql = `SELECT * FROM drugs WHERE expirationDay > '${datetime}'`;
      connection.query(sql, function (err, results) {
        if (err) throw err;
        connection.release();
        res.json(results);
      });
    });
  });

router.post("/create", function (req, res, next) {
  const drugName = req.body.drugName;
  const category = req.body.category;
  const expirationDay= req.body.expirationDay;
  const link= req.body.link;
  const amount= req.body.amount;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO drugs (id, drugName, category, expirationDay, link, amount) VALUES (NULL, ?, ?, ?, ?, ?);`;
    connection.query(sql, [ drugName, category, expirationDay, link, amount], function (err, results) {
      if (err) throw err;
      const id = results.insertId;
      connection.release();
      res.json({
        success: true,   
        id
      });
    });
  });
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `DELETE FROM drugs WHERE id=?`;
    connection.query(sql, [id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const drugName = req.body.drugName;
  const category = req.body.category;
  const expirationDay= req.body.expirationDay;
  const link= req.body.link;
  const amount= req.body.amount;

  console.log("DRUG ", req.body);
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `UPDATE drugs SET drugName=?, category=?, expirationDay=?, link=?, amount=? WHERE id=?`;
    connection.query(sql, [drugName, category, expirationDay, link, amount, id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

module.exports = router;
