import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Select({ name, label, optionDefault }) {
  return (
    <div className="select">
      <label
        htmlFor={name}
        className="select__label"
      >
        {label}
      </label>

      <select
        id={name}
        className="select__field"
      >
        <option value="" disabled selected hidden>{optionDefault}</option>

        <option value="quality">Quality</option>
        <option value="management">Management</option>
        <option value="Sales">Sales</option>
      </select>
    </div>
  );
}

Select.defaultProps = {
  optionDefault: 'Selecione uma opção',
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  optionDefault: PropTypes.string,
};

export default Select;
