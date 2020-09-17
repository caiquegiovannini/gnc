import React from 'react';
import PropTypes from 'prop-types';

import Selected from '../../assets/selected.svg';

import './styles.css';

function ActionCard({ action, actionsSelected, handleClickAction }) {
  const untilDate = action['until-when'].replaceAll('-', '/');
  const isSelected = actionsSelected.includes(action.id);

  return (
    <button
      type="button"
      onClick={() => handleClickAction(action.id)}
      className="action-card card"
    >

      <h4 className="action-card__topic">O que fazer:</h4>
      <p className="action-card__data">{action['what-to-do']}</p>

      <h4 className="action-card__topic">Por que fazer:</h4>
      <p className="action-card__data">{action['why-to-do-it']}</p>

      <h4 className="action-card__topic">Como fazer:</h4>
      <p className="action-card__data">{action['how-to-do-it']}</p>

      <h4 className="action-card__topic">Onde fazer:</h4>
      <p className="action-card__data">{action['where-to-do-it']}</p>

      <h4 className="action-card__topic">Até:</h4>
      <p className="action-card__data">{untilDate}</p>

      {isSelected
        && (
          <img
            src={Selected}
            alt="selected"
            className="action-card__selected"
          />
        )}

    </button>
  );
}

ActionCard.propTypes = {
  action: PropTypes.shape({
    id: PropTypes.number.isRequired,
    'what-to-do': PropTypes.string.isRequired,
    'why-to-do-it': PropTypes.string.isRequired,
    'how-to-do-it': PropTypes.string.isRequired,
    'where-to-do-it': PropTypes.string.isRequired,
    'until-when': PropTypes.string.isRequired,
  }).isRequired,
  actionsSelected: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleClickAction: PropTypes.func.isRequired,
};

export default ActionCard;
