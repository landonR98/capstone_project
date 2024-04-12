const sqlite = require("sqlite3");
const crypto = require("crypto");

/**
 * @typedef {import("../model/classes/user").User} User
 * @typedef {import("../../shared/types").UserSession} UserSession
 */

/**
 * create database if one don't exist
 * @returns {Promise<null>}
 */
function initializeSessions() {
  const db = getConnection();
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS user_sessions(token TEXT PRIMARY KEY, user_id INTEGER, first_name TEXT, last_name TEXT, phone_number TEXT, is_admin BOOLEAN, age INTEGER);",
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(null);
        }
      }
    );
  });
}

/**
 * @param {User} user
 * @return {Promise<UserSession>} session token
 */
function addSession(user) {
  const sql =
    "INSERT OR REPLACE INTO user_sessions" +
    "(token, user_id, first_name, last_name, phone_number, is_admin, age)" +
    " VALUES(?,?,?,?,?,?,?)";
  const token = crypto.randomBytes(32).toString("hex");
  const sessionCreationTime = Date.now();
  const session = [
    token,
    user.id,
    user.firstName,
    user.lastName,
    user.phoneNumber,
    user.isAdmin,
    sessionCreationTime,
  ];
  return new Promise((resolve, reject) => {
    getConnection().run(sql, session, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          token,
          user_id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          phone_number: user.phoneNumber,
          is_admin: user.isAdmin,
          age: sessionCreationTime,
        });
      }
    });
  });
}

/**
 * @param {string} token
 * @returns {Promise<UserSession>}
 */
function getSession(token) {
  const sql = "SELECT * FROM user_sessions WHERE token = ? LIMIT 1";
  return new Promise((resolve, reject) => {
    const db = getConnection();
    db.get(
      sql,
      [token],
      /** @param {UserSession} session */
      (error, session) => {
        if (error) {
          reject(error);
          return;
        }
        if (session === undefined) {
          reject(new Error("Session Expired"));
          return;
        }
        console.log(session);
        const timeDif = Date.now() - session.age;
        const hours = Math.round(timeDif / (1000 * 60 * 60));
        if (hours > 12) {
          // clean out expired sessions
          const sql = "DELETE FROM user_sessions WHERE age < ?";
          const date = new Date();
          date.setHours(date.getHours() - 12);
          getConnection().run(sql, [date.getTime()], (error) => {
            if (error) {
              reject(error);
            } else {
              reject(new Error("Session Expired"));
            }
          });
        } else {
          const sql = "UPDATE user_sessions SET age=? WHERE token = ?";
          getConnection().run(sql, [Date.now(), token], (error) => {
            if (error) {
              reject(error);
            } else {
              resolve(session);
            }
          });
        }
      }
    );
  });
}

/**@type {sqlite.Database | undefined} */
let connection;

/**
 * Returns global database connection
 * @returns {sqlite.Database}
 */
function getConnection() {
  if (typeof connection === "undefined") {
    connection = new sqlite.Database(
      ":memory:",
      sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  }
  return connection;
}

module.exports = {
  initializeSessions,
  addSession,
  getSession,
};
