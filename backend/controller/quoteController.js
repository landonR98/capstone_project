/**
 * @typedef {import("../model/classes/user").User} User
 * @typedef {import("../lib/session").UserSession} UserSession
 * @typedef {import("express").Request & {user?:User, cookies?:{session?:UserSession}}} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("../../shared/types").NewHomeQuoteRequest} NewHomeQuoteRequest
 * @typedef {import("../../shared/types").NewCarQuoteRequest} NewCarQuoteRequest
 * @typedef {import("../../shared/types").AllQuotesResponse} AllQuotesResponse
 * @typedef {import("../../shared/types").NewCarQuoteResponse} NewCarQuoteResponse
 * @typedef {import("../../shared/types").NewHomeQuoteResponse} NewHomeQuoteResponse
 * @typedef {import("../../shared/types").HomeQuoteType} HomeQuoteType
 */

const { body, validationResult, param } = require("express-validator");
const {
  SqliteCarQuoteDAO,
  SqliteHomeQuoteDAO,
} = require("../model/DAO/quoteDAO");
const { getConnection } = require("../model/sqlite");
const { yearsToDate } = require("../lib/date");
const { CarQuote, HomeQuote } = require("../model/classes/quote");
const { dateRegx } = require("../lib/util");

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
function getHandler(req, res) {
  const user = /**@type {User} */ (req.user);
  Promise.all([
    new SqliteCarQuoteDAO(user.id, getConnection()).getAllQuotes(),
    new SqliteHomeQuoteDAO(user.id, getConnection()).getAllQuotes(),
  ])
    .then(([carQuotes, homeQuotes]) => {
      /**@type {AllQuotesResponse} */
      const response = { carQuotes, homeQuotes };
      res.json(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
}

const homePostHandler = [
  body("home_age").isString().matches(dateRegx),
  body("heating_type")
    .isString()
    .trim()
    .matches(/^(Electric|Oil|Wood|Gas|Other)$/),
  /**
   * @param {Request & {body:NewHomeQuoteRequest}} req
   * @param {Response} res
   * @returns {void}
   */
  function (req, res) {
    const user = /**@type {User} */ (req.user);
    const base = 500;
    console.log("hello");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Input Validation failed:", errors);
      res.status(422).send();
      return;
    }

    /**@type {NewHomeQuoteRequest} */
    const { home_age, heating_type: heatingType } = req.body;
    const homeBuilt = new Date(home_age);
    const homeAge = yearsToDate(homeBuilt);

    /**@type {number} */
    let amount;
    if (homeAge < 25) {
      amount = base;
    } else if (homeAge > 50) {
      amount = base * 1.25;
    } else {
      amount = base * 1.5;
    }

    /**@type {HomeQuoteType} */
    const homeQuote = new HomeQuote(
      new Date(),
      amount,
      homeBuilt,
      heatingType,
      user.id
    );
    new SqliteHomeQuoteDAO(user.id, getConnection())
      .addQuote(homeQuote)
      .then(() => {
        /** @type {NewHomeQuoteResponse} */
        const response = { success: true, quote: homeQuote };
        res.send(response);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send();
      });
  },
];

const carPostHandler = [
  body("date_of_birth").isString().trim().matches(dateRegx),
  body("primary_location")
    .isString()
    .trim()
    .matches(/^(Dense Urban|Urban|Rural)$/),
  body("number_of_accidents").isNumeric(),
  /**
   * @param {Request & { body: NewCarQuoteRequest }} req
   * @param {Response} res
   * @returns {void}
   */
  function (req, res) {
    const user = /**@type {User} */ (req.user);
    const base = 750;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Input Validation failed:", errors);
      const errResponse = {};
      errors.array().forEach((err) => {
        if (err.type === "field") {
          // @ts-ignore
          errResponse[err.path] = err.msg;
        }
      });
      res.status(422).send({ success: false, errors: errResponse });
      return;
    }

    /**@type {NewCarQuoteRequest} */
    const {
      date_of_birth,
      primary_location: location,
      number_of_accidents,
    } = req.body;
    const accidents = Number(number_of_accidents);
    const birthDate = new Date(date_of_birth);
    const age = yearsToDate(birthDate);

    /**@type {number} */
    let amount;
    if (age < 25) {
      amount = base * 2;
    } else {
      amount = base;
    }

    switch (location) {
      case "Dense Urban":
        amount *= 1.5;
        break;
      case "Urban":
        amount *= 1.25;
        break;
      case "Rural":
        amount *= 1;
        break;
      default:
        throw new Error("invalid location");
    }

    if (accidents === 0) {
      amount *= 1;
    } else if (accidents === 1) {
      amount *= 1.25;
    } else if (accidents >= 2) {
      amount *= 2.5;
    }

    const carQuote = new CarQuote(
      new Date(),
      amount,
      birthDate,
      location,
      accidents,
      user.id
    );
    new SqliteCarQuoteDAO(user.id, getConnection())
      .addQuote(carQuote)
      .then(() => {
        /**@type {NewCarQuoteResponse} */
        const response = { success: true, quote: carQuote };
        res.send(response);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send();
      });
  },
];

const homeIdGetHandler = [
  param("quoteId").isNumeric().trim(),

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {void}
   */
  function (req, res) {
    const user = /**@type {User} */ (req.user);
    const quoteId = Number(req.params.quoteId);
    new SqliteHomeQuoteDAO(user.id, getConnection())
      .getQuoteById(quoteId)
      .then((quote) => {
        res.send(quote);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send();
      });
  },
];

const carIdGetHandler = [
  param("quoteId").isNumeric().trim(),

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {void}
   */
  function (req, res) {
    const user = /**@type {User} */ (req.user);
    const quoteId = Number(req.params.quoteId);
    new SqliteCarQuoteDAO(user.id, getConnection())
      .getQuoteById(quoteId)
      .then((quote) => {
        res.send(quote);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send();
      });
  },
];

module.exports = {
  getHandler,
  carPostHandler,
  homePostHandler,
  homeIdGetHandler,
  carIdGetHandler,
};
