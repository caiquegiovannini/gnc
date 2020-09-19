import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../services/utils';
import { BASE_URL } from '../../services/api';
import { allFieldsValidate } from '../../services/validations';

import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';

import './styles.css';

function Modal({
  closeModal, allDepartments,
}) {
  const [ocurrenceDate, setOcurrenceDate] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [description, setDescription] = useState('');

  function handleSelectDepartments(value) {
    return !selectedDepartments.includes(value)
      && setSelectedDepartments([
        ...selectedDepartments,
        value,
      ]);
  }

  function handleRemoveDepartments(value) {
    setSelectedDepartments(
      selectedDepartments.filter(
        (department) => department !== value,
      ),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const date = ocurrenceDate ? formatDate(ocurrenceDate) : '';
    const selectedDepartmentsIds = allDepartments.reduce((acc, dept) => {
      if (selectedDepartments.includes(dept.name)) {
        return [...acc, dept.id];
      }
      return acc;
    }, []);

    const newNonConformity = JSON.stringify({
      description,
      'ocurrence-date': date,
      departments: selectedDepartmentsIds,
      'corrective-actions': [],
    });

    const allFields = allFieldsValidate(newNonConformity, 'corrective-actions');

    if (allFields.length === 0) {
      try {
        await fetch(`${BASE_URL}/non-conformities`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: newNonConformity,
        });

        closeModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      allFields.map((field) => document.querySelector(`#${field}`)
        .setAttribute('style', 'border: 1px solid red;'));
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <form onSubmit={handleSubmit}>

          <fieldset className="modal__fieldset">
            <legend className="modal__title">
              Nova não conformidade
            </legend>

            <Input
              type="date"
              name="ocurrence-date"
              label="Data de ocorrência"
              value={ocurrenceDate}
              onChange={(event) => setOcurrenceDate(event.target.value)}
            />

            <Select
              name="departments"
              label="Departamentos"
              optionDefault="Selecione os departamentos"
              options={allDepartments}
              onChange={(event) => handleSelectDepartments(event.target.value)}
            />

            {selectedDepartments.length !== 0
              && (
                <div className="modal__labels">
                  <p className="modal__info">clique para remover</p>

                  <div>
                    {selectedDepartments.map((dept) => (
                      <div key={dept} className="modal__labels__department">
                        <button
                          type="button"
                          onClick={() => handleRemoveDepartments(dept)}
                          className="modal__labels__department__btn"
                        >
                          {dept}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <Textarea
              name="description"
              label="Descrição"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </fieldset>

          <footer className="modal__footer">
            <p className="modal__info" style={{ textAlign: 'right' }}>
              Todos os campos são obrigatórios
            </p>

            <div className="modal__footer__buttons">
              <button
                type="button"
                onClick={closeModal}
                className="button modal__button"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="button button--primary modal__button"
              >
                Criar
              </button>
            </div>
          </footer>

        </form>

      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  allDepartments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Modal;
