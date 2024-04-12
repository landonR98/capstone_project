const sqlite = require("sqlite3");

/**
 * create database if one don't exist
 * @param {sqlite.Database} db
 * @returns {Promise<null>}
 */
function initializeDB(db) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users';",
      [],
      (err, rows) => {
        if (err) {
          return reject(err);
        }

        db.serialize(() => {
          if (rows.length === 0) {
            db.run(
              "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password_hash TEXT, first_name TEXT, last_name TEXT, phone_number TEXT, is_admin BOOLEAN);"
            );
            db.run(
              "CREATE TABLE IF NOT EXISTS car_quotes(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date_of_request TEXT," +
                " date_of_birth TEXT, primary_location TEXT, number_of_accidents INTEGER, amount INTEGER)"
            );
            db.run(
              "CREATE TABLE IF NOT EXISTS home_quotes(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date_of_request TEXT," +
                " home_age TEXT, heating_type TEXT, amount INTEGER)",
              () => {
                resolve(null);
              }
            );
          } else {
            resolve(null);
          }
        });
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
      "./db/quotes.db",
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
  initializeDB,
  getConnection,
};
