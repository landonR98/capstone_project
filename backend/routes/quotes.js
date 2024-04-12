const express = require("express");
const {
  getHandler,
  carPostHandler,
  homePostHandler,
  homeIdGetHandler,
  carIdGetHandler,
} = require("../controller/quoteController");
const { authenticationHandler } = require("../controller/authController");
const router = express.Router();

// authentication handler
router.use(authenticationHandler);

// get quotes
router.get("/", getHandler);

// create new quote
router.post("/home", homePostHandler);
router.post("/car", carPostHandler);

// get quote
router.get("/home/:quoteId", homeIdGetHandler);
router.get("/car/:quoteId", carIdGetHandler);

module.exports = router;
