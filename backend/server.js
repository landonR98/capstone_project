require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const { initializeDB, getConnection } = require("./model/sqlite");
const { initializeSessions } = require("./lib/session");

const authRouter = require("./routes/auth");
const quoteRouter = require("./routes/quotes");
const path = require("path");

main();
async function main() {
  await initializeDB(getConnection());
  await initializeSessions();
  const app = setupRouters();
  startHTTP(app);
}

/**
 * sets up endpoints and middleware
 * @returns {express.Express}
 */
function setupRouters() {
  const app = express();

  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(cookieParser());

  app.use(express.static("public"));

  app.use("/api/auth", authRouter);
  app.use("/api/quote", quoteRouter);

  app.use(function (req, res) {
    res.sendFile(path.resolve(__dirname) + "/public/index.html");
  });

  return app;
}

/**
 * @param {express.Express} app
 */
function startHTTP(app) {
  const port = process.env.PORT || 3000;
  app.set("port", port);
  const server = http.createServer(app);
  console.log("starting server on port", port);
  server.listen(port);
}
