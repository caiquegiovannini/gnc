import React from 'react';

import Selected from '../../assets/selected.svg';

import './styles.css';

function ActionCard() {
  return (
    <div className="action-card card">
      <h4 className="action-card__topic">O que fazer:</h4>
      <p className="action-card__data">Solve the problem</p>

      <h4 className="action-card__topic">Por que fazer:</h4>
      <p className="action-card__data">Because it hurts our company</p>

      <h4 className="action-card__topic">Como fazer:</h4>
      <p className="action-card__data">Send an letter to anvisa</p>

      <h4 className="action-card__topic">Onde fazer:</h4>
      <p className="action-card__data">On the company</p>

      <h4 className="action-card__topic">Até:</h4>
      <p className="action-card__data">12/12/2019</p>

      <img
        src={Selected}
        alt="selected"
        className="action-card__selected"
      />

    </div>
  );
}

export default ActionCard;
