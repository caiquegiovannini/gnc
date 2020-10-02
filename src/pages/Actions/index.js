import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../services/api';
import { fetchData } from '../../services/utils/fetchData';

import ActionCard from '../../components/ActionCard';

import './styles.css';

function Actions() {
  const history = useHistory();
  const { nonConformityId } = useParams();

  const [nonConformity, setNonConformity] = useState({});
  const [action, setAction] = useState({
    'what-to-do': '',
    'why-to-do-it': '',
    'how-to-do-it': '',
    'where-to-do-it': '',
    'until-when': '',
  });

  useEffect(() => {
    function fetchNonConformity() {
      fetchData(`${BASE_URL}/non-conformities/${nonConformityId}`)
        .then((results) => {
          if (results.status === 'ok') {
            setNonConformity(results.data);
          } else {
            toast.error(`${results.error}`);
          }
        });
    }

    fetchNonConformity();
  }, [nonConformityId]);

  async function handleSaveActions(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/corrective-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action),
      });

      const { id } = await response.json();
      const editedNonConformity = JSON.stringify({
        ...nonConformity,
        'corrective-actions': [
          ...nonConformity['corrective-actions'],
          id,
        ],
      });

      await fetch(`${BASE_URL}/non-conformities/${nonConformityId}`, {
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
          <h3>Ação Corretiva</h3>

          <button
            type="submit"
            className="button button--primary"
          >
            Salvar
          </button>
        </header>

        <div className="actions__list">
          <ActionCard action={action} setAction={setAction} />
        </div>
      </form>
    </section>
  );
}

export default Actions;
