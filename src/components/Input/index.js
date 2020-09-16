import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Input({ name, label, type }) {
  return (
    <div className="input">
      <label
        htmlFor={name}
        className="input__label"
      >
        {label}
      </label>

      <input
        type={type}
        id={name}
        className="input__field"
      />
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  label: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
