/**
 * @typedef {import("sqlite3").Database} Database
 * @typedef {import("./interface").UserDAO} UserDAO
 */

const { User } = require("../classes/user");

/**
 * @class
 * @classdesc Data access object for user
 * @implements {UserDAO}
 */
class SqliteUserDAO {
  /**@type {Database} */
  connection;

  /**@param {Database} connection */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * @param {string} email
   * @returns {Promise<User>}
   */
  getUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
    return new Promise((resolve, reject) => {
      this.connection.get(sql, [email], (error, row) => {
        if (error) {
          reject(error);
        } else if (row === undefined || row === null) {
          reject(new Error("EMAIL_DON'T_EXIST"));
        } else {
          resolve(
            new User(
              row.email,
              row.password_hash,
              row.first_name,
              row.last_name,
              row.phone_number,
              row.is_admin,
              row.id
            )
          );
        }
      });
    });
  }

  /**
   * @param {number} userId
   * @returns {Promise<User>}
   */
  getUserById(userId) {
    const sql = "SELECT * FROM users WHERE id = ? LIMIT 1";
    return new Promise((resolve, reject) => {
      this.connection.get(sql, [userId], (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            new User(
              row.email,
              row.password_hash,
              row.first_name,
              row.last_name,
              row.phone_number,
              row.is_admin,
              row.id
            )
          );
        }
      });
    });
  }

  /**
   * @param {User} user
   * @returns {Promise<void>}
   */
  addUser(user) {
    const sql =
      "INSERT INTO users(email, password_hash, first_name, last_name, phone_number, is_admin) VALUES(?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      this.connection.run(
        sql,
        [
          user.email,
          user.passwordHash,
          user.firstName,
          user.lastName,
          user.phoneNumber,
          user.isAdmin,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = {
  SqliteUserDAO,
};
