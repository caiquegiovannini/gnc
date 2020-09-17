async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

function formatDate(date) {
  const dateToFormat = new Date(date);

  const day = `0${dateToFormat.getUTCDate()}`.slice(-2);
  const month = `0${dateToFormat.getUTCMonth() + 1}`.slice(-2);
  const year = dateToFormat.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export default {
  formatDate,
  fetchData,
};
