/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("../../shared/types").LoginRequest} LoginRequest
 * @typedef {import("../../shared/types").LoginResponse} LoginResponse
 * @typedef {import("../../shared/types").SignUpRequest} SignUpRequest
 * @typedef {import("../../shared/types").SignUpResponse} SignUpResponse
 * @typedef {import("../../shared/types").SignUpErrors} SignUpErrors
 * @typedef {import("express").NextFunction} NextFunction
 */

const { body, validationResult } = require("express-validator");
const { User } = require("../model/classes/user");
const { SqliteUserDAO } = require("../model/DAO/userDAO");
const { getConnection } = require("../model/sqlite");
const { hashPassword } = require("../lib/crypto");
const { addSession, getSession } = require("../lib/session");
const jwt = require("jsonwebtoken");

const jwtSecret =
  process.env.SECRET ||
  "this is my secret. There are many like it. but this one is mine";

const loginErrorMsg = "username or email is incorrect";

const loginPostHandler = [
  body("email").isString().trim().isLength({ min: 1, max: 50 }).isEmail(),
  body("password").isString().trim().isLength({ min: 10, max: 150 }),
  /**
   * @param {Request} req
   * @param {Response} res
   */
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.send({
        error: loginErrorMsg,
        success: false,
      });
    }

    /**@type {LoginRequest} */
    const { email, password } = req.body;

    new SqliteUserDAO(getConnection())
      .getUserByEmail(email)
      .then((user) => {
        const hash = hashPassword(password);
        if (hash === user.passwordHash) {
          addSession(user)
            .then((session) => {
              const token = jwt.sign({ token: session.token }, jwtSecret);
              /**@type {LoginResponse} */
              const response = { success: true, token, session };
              res.send(response);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send();
            });
        } else {
          res.send({ error: loginErrorMsg, success: false });
        }
      })
      .catch(
        /**@param {Error} error  */
        (error) => {
          if (error.message === "EMAIL_DON'T_EXIST") {
            res.send({ error: loginErrorMsg, success: false });
          } else {
            console.error(error);
            res.status(500).send();
          }
        }
      );
  },
];

/**
 * @param {number} min
 * @param {number} max
 * @returns {string}
 */
function lengthError(min, max) {
  return `Length must be between ${min} and ${max}`;
}

const requiredFieldMsg = "Field is required";

const signupPostHandler = [
  body("firstName", requiredFieldMsg)
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isLength({ min: 1, max: 30 })
    .withMessage(lengthError(1, 30))
    .isAlpha()
    .withMessage("Must be Alphabetic characters only"),
  body("lastName", requiredFieldMsg)
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isLength({ min: 1, max: 30 })
    .withMessage(lengthError(1, 30))
    .isAlpha()
    .withMessage("Must be Alphabetic characters only"),
  body("email", requiredFieldMsg)
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isLength({ min: 1, max: 50 })
    .isEmail()
    .isLength({ min: 1 })
    .withMessage(lengthError(1, 50)),
  body("email2", requiredFieldMsg)
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isLength({ min: 1, max: 50 })
    .isEmail()
    .isLength({ min: 1 })
    .withMessage(lengthError(1, 50)),
  body("password", requiredFieldMsg)
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isLength({ min: 10, max: 150 })
    .withMessage(lengthError(10, 150)),
  body("password2", requiredFieldMsg)
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isLength({ min: 10, max: 150 })
    .withMessage(lengthError(10, 150)),

  /**
   * @param {Request} req
   * @param {Response} res
   */
  function (req, res) {
    const validationResults = validationResult(req);
    /**@type {SignUpErrors} */
    const errors = {};
    if (!validationResults.isEmpty()) {
      validationResults.array().forEach((error) => {
        if (error.type === "field") {
          // @ts-ignore
          if (errors[error.path] === undefined) {
            // @ts-ignore
            errors[error.path] = error.msg;
          }
        }
      });
      return res.send({ errors, success: false });
    }

    /**@type {SignUpRequest} */
    const body = req.body;

    let noMatch = false;
    if (body.email !== body.email2) {
      errors.email2 = "Emails must match";
      noMatch = true;
    }
    if (body.password !== body.password2) {
      errors.password2 = "Passwords must match";
      noMatch = true;
    }

    if (noMatch) {
      console.log(body);
      return res.send({ errors, success: false });
    }

    const passwordHash = hashPassword(body.password);

    const user = new User(
      body.email,
      passwordHash,
      body.firstName,
      body.lastName,
      body.phoneNumber
    );

    new SqliteUserDAO(getConnection())
      .addUser(user)
      .then(() => {
        res.send({ errors, success: true });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send();
      });
  },
];

/**
 * @param {Request & {user?:User}} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function authenticationHandler(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res
      .status(401)
      .send({ message: "Authentication failed! Please try again" });
  } else {
    jwt.verify(authorization, jwtSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Authentication failed! Please try again" });
      }
      // @ts-ignore
      getSession(decoded.token)
        .then((session) => {
          new SqliteUserDAO(getConnection())
            .getUserById(session.user_id)
            .then((user) => {
              req.user = user;
              return next();
            })
            .catch((e) => {
              console.error(e);
              res.status(500).send();
            });
        })
        .catch((e) => {
          console.log("expired");
          console.error(e);
          res.status(401).send();
        });
    });
  }
}

module.exports = {
  loginPostHandler,
  signupPostHandler,
  authenticationHandler,
};
