import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BASE_URL } from '../../services/api';

import ActionCard from '../../components/ActionCard';

import './styles.css';

function Actions() {
  const history = useHistory();
  const { id } = useParams();

  const [actions, setActions] = useState(null);
  const [nonConformity, setNonConformity] = useState(null);
  const [actionsSelected, setActionsSelected] = useState(null);

  // Fetch all corrective actions
  useEffect(() => {
    fetch(`${BASE_URL}/corrective-actions`)
      .then((response) => response.json())
      .then((data) => setActions(data));
  }, [BASE_URL]);

  // Fetch this non conformity's corrective actions
  useEffect(() => {
    fetch(`${BASE_URL}/non-conformities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNonConformity(data);
        setActionsSelected(data['corrective-actions']);
      });
  }, [BASE_URL, id]);

  function handleClickAction(actionId) {
    if (actionsSelected.includes(actionId)) {
      const newActions = actionsSelected.filter((action) => action !== actionId);

      setActionsSelected(newActions);
    } else {
      setActionsSelected([...actionsSelected, actionId]);
    }
  }

  async function handleSaveActions(event) {
    event.preventDefault();

    const editedNonConformity = JSON.stringify({
      ...nonConformity,
      'corrective-actions': actionsSelected,
    });

    try {
      await fetch(`${BASE_URL}/non-conformities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: editedNonConformity,
      });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="actions container">
      <form onSubmit={handleSaveActions}>
        <header className="actions__header">
          <div>
            <h3>Ações Corretivas</h3>
            <p className="actions__header__selected">
              <strong>{actionsSelected ? actionsSelected.length : '0'}</strong>
              {' '}
              selecionadas
            </p>
          </div>

          <button
            type="submit"
            className="button button--primary"
          >
            Salvar
          </button>
        </header>

        <div className="actions__list">
          {actions && actionsSelected
            ? (actions.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
                actionsSelected={actionsSelected}
                handleClickAction={handleClickAction}
              />
            )))
            : 'Carregando...'}
        </div>
      </form>
    </section>
  );
}

export default Actions;
