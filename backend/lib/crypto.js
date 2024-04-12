const crypto = require("crypto");

const SALT = process.env.SALT || "";

/**
 * @param {string} password
 * @returns {string}
 */
function hashPassword(password) {
  return crypto.pbkdf2Sync(password, SALT, 1000, 64, "sha512").toString("hex");
}

module.exports = {
  hashPassword,
};
