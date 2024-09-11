const router = require("express").Router();
const User = require("../models/User");

const userController = require("../controllers/userController");

//register
router.post("/register", userController.register);

//login
router.post("/login", userController.login);

module.exports = router;
