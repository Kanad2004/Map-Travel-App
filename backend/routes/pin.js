const router = require("express").Router();
const Pin = require("../models/Pin");
const pinController = require("../controllers/pinController");

//create a pin
router.post("/", pinController.addPin);

//get all pins
router.get("/", pinController.getPins);

module.exports = router;
 