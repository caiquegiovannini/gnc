function allFieldsValidate(body, exception = '') {
  const bodyObject = JSON.parse(body);
  const keys = Object.keys(bodyObject);

  const notFilled = keys.filter((key) => (
    key !== exception
    && (bodyObject[key] === '' || bodyObject[key].length === 0)
  ));

  return notFilled;
}

module.exports = {
  allFieldsValidate,
};
