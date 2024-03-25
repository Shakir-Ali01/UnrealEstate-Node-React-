var express = require("express");
const {
  getProperties,
  bookPropertyForTenant,
  addProperty,
  updateProperty,
  deleteProperty,
  getOneProperty,
  getRentDue,
} = require("../controller/propController");
var router = express.Router();

// ---- property routes ----
router.get("/", getProperties);
router.get("/rentDue", getRentDue);
router.get("/:propId", getOneProperty);

router.put("/book/:propertyId", bookPropertyForTenant);
router.put("/:propertyId", updateProperty);

router.post("/:username", addProperty);

router.delete("/:propertyId", deleteProperty);

module.exports = router;
