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
  database: "teams"
});

/**
 * run this before first USAGE to create members TABLE
 */
router.get("/install", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS drugs (id INT NOT NULL AUTO_INCREMENT, drugName TEXT NOT NULL, drugCategory TEXT NOT NULL, dateInputTEXT NOT NULL, drugInfo TEXT NOT NULL, amount TEXT NOT NULL, PRIMARY KEY (id)) ENGINE = InnoDB;
    `;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();
      res.redirect("/");
    });
  });
});

/**
 *
 */
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `SELECT id, drugName, drugCategory, dateInput, drugInfo, amount FROM drugs`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();
      res.json(results);
    });
  });
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const drugName = req.body.drugName;
  const drugCategory = req.body.drugCategory;
  const dateInput= req.body.drugExpirationDay;
  const drugInfo= req.body.drugLink;
  const amount= req.body.drugAmount;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO drugs(id, drugName, drugCategory, dateInput, drugInfo, amount) VALUES (NULL, ?, ?, ?);`;
    connection.query(sql, [ drugName, drugCategory, dateInput, drugInfo, amount], function (err, results) {
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
  const id= req.body.id;
  const drugName = req.body.drugName;
  const drugCategory = req.body.drugCategory;
  const dateInput= req.body.drugExpirationDay;
  const drugInfo= req.body.drugLink;
  const amount= req.body.drugAmount;
  
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `UPDATE members SET firstName=?, lastName=?, gitHub=? WHERE id=?`;
    connection.query(sql, [id, drugName, drugCategory, dateInput, drugInfo, amount], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

module.exports = router;
