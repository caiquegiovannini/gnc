import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../services/api';
import { fetchData } from '../../services/utils';

import ActionCard from '../../components/ActionCard';
import Loading from '../../components/Loading';

import './styles.css';

function Actions() {
  const history = useHistory();
  const { id } = useParams();

  const [actions, setActions] = useState(null);
  const [nonConformity, setNonConformity] = useState(null);
  const [actionsSelected, setActionsSelected] = useState(null);

  // Fetch all corrective actions
  useEffect(() => {
    fetchData(`${BASE_URL}/corrective-actions`)
      .then((results) => (results.status === 'ok'
        ? setActions(results.data)
        : toast.error(`${results.error}`)));
  }, []);

  // Fetch this non conformity's corrective actions
  useEffect(() => {
    fetchData(`${BASE_URL}/non-conformities/${id}`)
      .then((results) => {
        if (results.status === 'ok') {
          setNonConformity(results.data);
          setActionsSelected(results.data['corrective-actions']);
        } else {
          toast.error(`${results.error}`);
        }
      });
  }, [id]);

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
      toast.success('As ações corretivas foram salvas com sucesso!');
    } catch (error) {
      toast.error(`O seguinte erro ocorreu: ${error}`);
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
              selecionada
              {actionsSelected && actionsSelected.length === 1 ? '' : 's'}
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
            : <Loading />}
        </div>
      </form>
    </section>
  );
}

export default Actions;
