const quote = require("../classes/quote.js");
/**
 * @typedef {import("sqlite3").Database} Database
 * @typedef {import("./interface.d.ts").CarQuoteDAO} CarQuoteDAO
 * @typedef {import("./interface.d.ts").HomeQuoteDAO} HomeQuoteDAO
 * @typedef {import("../../../shared/types.d.ts").HomeQuoteType} HomeQuoteType
 */

/**
 * @class
 * @implements {CarQuoteDAO}
 */
class SqliteCarQuoteDAO {
  /**
   * @type {Database}
   * @private
   */
  connection;
  /**
   * @type {number}
   * @private
   */
  userId;

  /**
   * @param {number} userId
   * @param {Database} connection
   */
  constructor(userId, connection) {
    this.connection = connection;
    this.userId = userId;
  }

  /**
   * @returns {Promise<Array<quote.CarQuote>>}
   */
  getAllQuotes() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM car_quotes WHERE user_id = ?";
      this.connection.all(sql, [this.userId], (err, rows) => {
        /**@type {Array<quote.CarQuote>} */
        const carQuotes = [];
        if (err) {
          console.log("failed to get car quotes from database");
          console.error(err);
          reject(err);
        } else {
          for (let row of rows) {
            console.log(row);

            const dateOfRequest = new Date(
              Math.round(Number(row.date_of_request))
            );
            const dateOfBirth = new Date(Math.round(Number(row.date_of_birth)));

            console.log(dateOfRequest);
            carQuotes.push(
              new quote.CarQuote(
                dateOfRequest,
                row.amount,
                dateOfBirth,
                row.primary_location,
                row.number_of_accidents,
                row.id
              )
            );
          }
          resolve(carQuotes);
        }
      });
    });
  }

  /**
   * @param {number} id
   * @returns {Promise<quote.CarQuote>}
   */
  getQuoteById(id) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM car_quotes WHERE user_id = ? AND id = ? LIMIT 1";
      this.connection.get(sql, [this.userId, id], (err, row) => {
        if (err) {
          console.log("failed to get car quote from database");
          console.error(err);
          reject(err);
        } else {
          const dateOfRequest = new Date(row.date_of_request);
          const dateOfBirth = new Date(row.date_of_birth);

          const carQuote = new quote.CarQuote(
            dateOfRequest,
            row.amount,
            dateOfBirth,
            row.primary_location,
            row.number_of_accidents,
            row.id
          );
          resolve(carQuote);
        }
      });
    });
  }

  /**
   * @param {quote.CarQuote} quote
   * @returns {Promise<void>}
   */
  addQuote(quote) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO car_quotes (date_of_birth, primary_location, number_of_accidents, amount, date_of_request, user_id) values(?,?,?,?,?,?)";
      const values = [
        quote.dateOfBirth,
        quote.primaryLocation,
        quote.numberOfAccidents,
        quote.amount,
        quote.dateOfRequest,
        this.userId,
      ];
      this.connection.run(sql, values, (err) => {
        if (err) {
          console.log("failed to insert car quote into database");
          console.error(err);
          reject(err);
        } else {
          console.log("successfully inserted quote");
          resolve();
        }
      });
    });
  }
}

/**
 * @class
 * @implements {HomeQuoteDAO}
 */
class SqliteHomeQuoteDAO {
  /**@type {Database} */
  connection;
  /**@type {number} */
  userId;

  /**
   * @param {number} userId
   * @param {Database} connection
   */
  constructor(userId, connection) {
    this.connection = connection;
    this.userId = userId;
  }

  /**
   * @returns {Promise<Array<quote.HomeQuote>>}
   */
  getAllQuotes() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM home_quotes WHERE user_id = ?";
      this.connection.all(sql, [this.userId], (err, rows) => {
        /**@type {Array<quote.HomeQuote>} */
        const homeQuotes = [];
        if (err) {
          console.log("failed to get quotes from database");
          console.error(err);
          reject(err);
        } else {
          for (let row of rows) {
            const dateOfRequest = new Date(
              Math.round(Number(row.date_of_request))
            );
            homeQuotes.push(
              new quote.HomeQuote(
                dateOfRequest,
                row.amount,
                row.home_age,
                row.heating_type,
                row.id
              )
            );
          }
          resolve(homeQuotes);
        }
      });
    });
  }

  /**
   * @param {number} id
   * @returns {Promise<quote.HomeQuote>}
   */
  getQuoteById(id) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM home_quotes WHERE user_id = ? AND id = ? LIMIT 1";
      this.connection.get(sql, [this.userId, id], (err, row) => {
        if (err) {
          console.log("failed to get quotes from database");
          console.error(err);
          reject(err);
        } else {
          const dateOfRequest = new Date(row.date_of_request);
          const homeQuotes = new quote.HomeQuote(
            dateOfRequest,
            row.amount,
            row.home_age,
            row.heating_type,
            row.id
          );
          resolve(homeQuotes);
        }
      });
    });
  }

  /**
   * @param {quote.HomeQuote | HomeQuoteType} quote
   * @returns {Promise<void>}
   */
  addQuote(quote) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO home_quotes (home_age, heating_type, amount, date_of_request, user_id) values(?,?,?,?,?)";
      const values = [
        quote.homeAge,
        quote.heatingType,
        quote.amount,
        quote.dateOfRequest,
        this.userId,
      ];
      this.connection.run(sql, values, (err) => {
        if (err) {
          console.log("failed to insert quote into database");
          console.error(err);
          reject(err);
        } else {
          console.log("successfully inserted quote");
        }

        resolve();
      });
    });
  }
}

module.exports = {
  SqliteCarQuoteDAO,
  SqliteHomeQuoteDAO,
};
