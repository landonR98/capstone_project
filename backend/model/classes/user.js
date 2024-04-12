/**
 * @classdesc class representing a user
 * @class
 */
class User {
  /**@type {string} */
  email;
  /**@type {string} */
  passwordHash;
  /**@type {string} */
  firstName;
  /**@type {string} */
  lastName;
  /**@type {string} */
  phoneNumber;
  /**@type {boolean} */
  isAdmin;
  /**@type {number} */
  id;

  /**
   * @param {string} email
   * @param {string} passwordHash
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} phoneNumber
   * @param {boolean} [isAdmin]
   * @param {number} [id]
   */
  constructor(
    email,
    passwordHash,
    firstName,
    lastName,
    phoneNumber,
    isAdmin = false,
    id = 0
  ) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.isAdmin = isAdmin;
    this.id = id;
  }
}

module.exports = {
  User,
};
