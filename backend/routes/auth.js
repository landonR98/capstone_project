const express = require("express");
const {
  signupPostHandler,
  loginPostHandler,
} = require("../controller/authController");

const router = express.Router();

router.post("/login", loginPostHandler);

router.post("/signup", signupPostHandler);

module.exports = router;
