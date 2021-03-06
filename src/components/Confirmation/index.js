import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../services/api';

import './styles.css';

function Confirmation({ setConfirmation, id }) {
  async function handleDelete() {
    try {
      await fetch(`${BASE_URL}/non-conformities/${id}`, {
        method: 'DELETE',
      });

      setConfirmation(false);
      toast.success('Não conformidade exlcuída com sucesso!');
    } catch (error) {
      toast.error(`O seguinte erro ocorreu: ${error}`);
    }
  }

  return (
    <div className="confirmation-overlay">
      <div className="confirmation">
        <p className="confirmation__message">Você está prestes a excluir esta Não Conformidade permanentemente!</p>
        <p className="confirmation__message">Tem certeza que deseja continuar?</p>

        <div className="confirmation__buttons">
          <button
            type="button"
            className="button"
            onClick={() => setConfirmation(false)}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="button button--delete"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

Confirmation.propTypes = {
  setConfirmation: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Confirmation;
