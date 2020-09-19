import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Textarea({ id, label, onChange }) {
  return (
    <div className="textarea">
      <label
        htmlFor={id}
        className="textarea__label"
      >
        {label}
      </label>

      <textarea
        id={id}
        className="textarea__field"
        onChange={onChange}
      />
    </div>
  );
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Textarea;
