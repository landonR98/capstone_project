/**
 * @param {Date} date
 */
function yearsToDate(date) {
  const time = Date.now() - date.getTime();
  const years = Math.round(time / (1000 * 60 * 60 * 24));

  return years;
}

module.exports = {
  yearsToDate,
};
