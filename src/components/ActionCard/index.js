import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import './styles.css';

function ActionCard({ action, setAction }) {
  function setActionKey(key, value) {
    setAction({
      ...action,
      [key]: value,
    });
  }

  return (
    <div
      className="action-card card"
    >

      <Input id="what-to-do" label="O que fazer:" value={action['what-to-do']} onChange={(event) => setActionKey('what-to-do', event.target.value)} />

      <Input id="why-to-do" label="Por que fazer:" value={action['why-to-do-it']} onChange={(event) => setActionKey('why-to-do-it', event.target.value)} />

      <Input id="how-to-do" label="Como fazer:" value={action['how-to-do-it']} onChange={(event) => setActionKey('how-to-do-it', event.target.value)} />

      <Input id="where-to-do" label="Onde fazer:" value={action['where-to-do-it']} onChange={(event) => setActionKey('where-to-do-it', event.target.value)} />

      <Input id="until-when" label="Até:" value={action['until-when']} onChange={(event) => setActionKey('until-when', event.target.value)} />

    </div>
  );
}

ActionCard.propTypes = {
  action: PropTypes.shape({
    'what-to-do': PropTypes.string.isRequired,
    'why-to-do-it': PropTypes.string.isRequired,
    'how-to-do-it': PropTypes.string.isRequired,
    'where-to-do-it': PropTypes.string.isRequired,
    'until-when': PropTypes.string.isRequired,
  }).isRequired,
  setAction: PropTypes.func.isRequired,
};

export default ActionCard;
