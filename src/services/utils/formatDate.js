function takeDayMonthYearFromDate(date) {
  const dateToFormat = new Date(date);

  const day = `0${dateToFormat.getUTCDate()}`.slice(-2);
  const month = `0${dateToFormat.getUTCMonth() + 1}`.slice(-2);
  const year = dateToFormat.getUTCFullYear();

  return {
    day,
    month,
    year,
  };
}

function dayMonthYear(date) {
  const { day, month, year } = takeDayMonthYearFromDate(date);

  return `${day}-${month}-${year}`;
}

function yearMonthDay(date) {
  const { day, month, year } = takeDayMonthYearFromDate(date);

  return `${year}-${month}-${day}`;
}

module.exports = {
  dayMonthYear,
  yearMonthDay,
};
