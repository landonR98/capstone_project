/**
 * @typedef {import("../../../shared/types").HeatingType} HeatingType
 * @typedef {import("../../../shared/types").LocationType} LocationType
 * @typedef {import("../../../shared/types").CarQuoteType} CarQuoteType
 * @typedef {import("../../../shared/types").HomeQuoteType} HomeQuoteType
 */

/**
 * @classdesc Abstract parent of other quote classes
 * @class
 */
class Quote {
  /**@type {number} */
  id;
  /**@type {Date} */
  dateOfRequest;
  /**@type {number} */
  amount;
  /**
   * @param {Date} dateOfRequest
   * @param {number} amount
   * @param {number | undefined} [id]
   */
  constructor(dateOfRequest, amount, id = 0) {
    this.id = id;
    this.dateOfRequest = dateOfRequest;
    this.amount = amount;
  }
}

/**
 * @classdesc class representing a home quote
 * @class
 * @implements {HomeQuoteType}
 */
class HomeQuote extends Quote {
  /**@type {Date} */
  homeAge;
  /**@type {HeatingType} */
  heatingType;

  /**
   * @param {Date} dateOfRequest
   * @param {number} amount
   * @param {Date} homeAge
   * @param {HeatingType} heatingType
   * @param {number | undefined} [id]
   */
  constructor(dateOfRequest, amount, homeAge, heatingType, id) {
    super(dateOfRequest, amount, id);
    this.homeAge = homeAge;
    this.heatingType = heatingType;
  }
}

/** @implements {CarQuoteType} */
class CarQuote extends Quote {
  /**@type {Date} */
  dateOfBirth;
  /**@type {LocationType} */
  primaryLocation;
  /**@type {number} */
  numberOfAccidents;

  /**
   * @param {Date} dateOfRequest
   * @param {number} amount
   * @param {Date} dateOfBirth
   * @param {LocationType} primaryLocation
   * @param {number} numberOfAccidents
   * @param {number | undefined} [id]
   */
  constructor(
    dateOfRequest,
    amount,
    dateOfBirth,
    primaryLocation,
    numberOfAccidents,
    id
  ) {
    super(dateOfRequest, amount, id);
    this.dateOfBirth = dateOfBirth;
    this.primaryLocation = primaryLocation;
    this.numberOfAccidents = numberOfAccidents;
  }
}

module.exports = {
  HomeQuote,
  CarQuote,
};
