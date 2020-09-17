import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Select({
  name, label, optionDefault, options, onChange,
}) {
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
        defaultValue={optionDefault}
        onChange={onChange}
        className="select__field"
      >
        <option value={optionDefault} disabled hidden>{optionDefault}</option>

        {options
          && (
            options.map((option) => (
              <option key={option.id} value={option.name}>{option.name}</option>
            ))
          )}
      </select>
    </div>
  );
}

Select.defaultProps = {
  label: '',
  optionDefault: 'Selecione uma opção',
  options: [],
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  optionDefault: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])),
  onChange: PropTypes.func.isRequired,
};

export default Select;
