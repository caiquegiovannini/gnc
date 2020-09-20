import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Input({
  id, label, value, type, onChange,
}) {
  return (
    <div className="input">
      <label
        htmlFor={id}
        className="input__label"
      >
        {label}
      </label>

      <input
        data-testid="input"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
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
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
