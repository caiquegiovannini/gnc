import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Textarea({ name, label, onChange }) {
  return (
    <div className="textarea">
      <label
        htmlFor={name}
        className="textarea__label"
      >
        {label}
      </label>

      <textarea
        id={name}
        className="textarea__field"
        onChange={onChange}
      />
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Textarea;
