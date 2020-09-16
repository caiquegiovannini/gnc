import React from 'react';

import ActionCard from '../../components/ActionCard';

import './styles.css';

function Actions() {
  return (
    <section className="actions container">
      <header className="actions__header">
        <div>
          <h3>Ações Corretivas</h3>
          <p className="actions__header__selected">
            <strong>2</strong>
            {' '}
            selecionadas
          </p>
        </div>

        <button
          type="button"
          className="button button--primary"
        >
          Salvar
        </button>
      </header>

      <div className="actions__list">
        <ActionCard />
        <ActionCard />
        <ActionCard />
        <ActionCard />
      </div>
    </section>
  );
}

export default Actions;
