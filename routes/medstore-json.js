var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/store.json";

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

/**
 *
 */
router.get("/", function (req, res, next) {
  const content = fs.readFileSync(DATA_PATH);
  const drugs= JSON.parse(content);
  res.json(drugs);
});

/**
 *
 */
router.post("/create", function (req, res, next) {

  const drugName = req.body.drugName;
  const category = req.body.category;
  const expirationDay= req.body.expirationDay;
  const link= req.body.link;
  const amount= req.body.amount;

  let content = fs.readFileSync(DATA_PATH);
  const drugs = JSON.parse(content);

  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  drugs.push({
    id,
    drugName,
    category,
    expirationDay,
    link,
    amount
  });

  content = JSON.stringify(drugs, null, 2);
  fs.writeFileSync(DATA_PATH, content);
  res.json({ success: true, id });
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  let content = fs.readFileSync(DATA_PATH);
  const drugs = JSON.parse(content);

  const remainingDrugs = drugs.filter(function (drug) {
    return drug.id != id;
  });

  content = JSON.stringify(remainingDrugs, null, 2);
  fs.writeFileSync(DATA_PATH, content);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  console.log("!!!", req.body);
  const id = req.body.id;
  const drugName = req.body.drugName;
  const category = req.body.category;
  const expirationDay = req.body.expirationDay;
  const link = req.body.drugLink;
  const amount = req.body.amount;

  console.log("Drug", req.body);

  let content = fs.readFileSync(DATA_PATH);
  const drugs = JSON.parse(content);

  const contact = drugs.find(function (drug) {
    return drug.id == id;
  });
  if (contact) {
    contact.id= id;
    contact.drugName = drugName;
    contact.category = category;
    contact.expirationDay = expirationDay;
    contact.link = link;
    contact.amount = amount;
  }

  content = JSON.stringify(drugs, null, 2);
  fs.writeFileSync(DATA_PATH, content);

  res.json({ success: true });
});

module.exports = router;
