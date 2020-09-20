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

module.exports = {
  fetchData,
};
