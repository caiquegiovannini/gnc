import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DeleteIcon from '../../assets/close-icon.svg';

import './styles.css';

function NonConformityCard({
  data, departments, setConfirmation, setId,
}) {
  const { id, description } = data;
  const date = data['ocurrence-date'].replaceAll('-', '/');
  const actions = data['corrective-actions'];

  return (
    <div className="nc-card card">
      <header className="nc-card__header">
        <div className="nc-card__header__info">
          <h3>{date}</h3>

          <h3>
            {departments.map((department, index) => {
              if (index === (departments.length - 1)) {
                return department;
              }
              return `${department}, `;
            })}
          </h3>
        </div>

        <button
          type="button"
          className="nc-card__header__remove"
          onClick={() => {
            setConfirmation(true);
            setId(id);
          }}
        >
          <img
            src={DeleteIcon}
            alt="delete"
          />
        </button>
      </header>

      <main className="nc-card__main">
        <p className="nc-card__main__description">
          {description}
        </p>
      </main>

      <footer className="nc-card__footer">
        <p className="nc-card__footer__actions">
          {actions.length}
          {' '}
          ações
        </p>
        <Link
          to={`/${id}/actions`}
          className="button button--primary"
        >
          Criar ação corretiva
        </Link>
      </footer>
    </div>
  );
}

NonConformityCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    'ocurrence-date': PropTypes.string.isRequired,
    'corrective-actions': PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  departments: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setConfirmation: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
};

export default NonConformityCard;
