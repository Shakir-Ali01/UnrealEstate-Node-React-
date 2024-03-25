var express = require("express");
const { createData, getData } = require("../controller/indexController");
var router = express.Router();

// misc routes
router.get("/", (req, res) => {
  try {
    res.json({ "Backend Status": "UnReal ........" });
  } catch (err) {
    next(err);
  }
});

 
router.get("/createData", createData);
router.get("/data", getData);

module.exports = router;
