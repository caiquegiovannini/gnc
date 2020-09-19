async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      status: 'ok',
      data,
    };
  } catch (error) {
    return {
      status: 'error',
      error,
    };
  }
}

const formatDate = {
  takeDayMonthYearFromDate: (date) => {
    const dateToFormat = new Date(date);

    const day = `0${dateToFormat.getUTCDate()}`.slice(-2);
    const month = `0${dateToFormat.getUTCMonth() + 1}`.slice(-2);
    const year = dateToFormat.getUTCFullYear();

    return {
      day,
      month,
      year,
    };
  },

  dayMonthYear: (date) => {
    const { day, month, year } = formatDate.takeDayMonthYearFromDate(date);

    return `${day}-${month}-${year}`;
  },

  yearMonthDay: (date) => {
    const { day, month, year } = formatDate.takeDayMonthYearFromDate(date);

    return `${year}-${month}-${day}`;
  },
};

module.exports = {
  formatDate,
  fetchData,
};
