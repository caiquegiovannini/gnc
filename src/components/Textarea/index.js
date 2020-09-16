import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Textarea({ name, label }) {
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
      />
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Textarea;
