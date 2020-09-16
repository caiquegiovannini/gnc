import React from 'react';

import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';

import './styles.css';

function Modal() {
  function handleSubmit(event) {
    event.preventDefault();
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
              name="date"
              label="Data de ocorrência"
            />

            <Select
              name="departments"
              label="Departamentos"
              optionDefault="Selecione os departamentos"
            />

            <div className="modal__labels">
              <p className="modal__info">clique para remover</p>
              <div>
                <div className="modal__labels__department">
                  Quality
                </div>
                <div className="modal__labels__department">
                  Management
                </div>
              </div>
            </div>

            <Textarea
              name="description"
              label="Descrição"
            />
          </fieldset>

          <footer className="modal__footer">
            <p className="modal__info" style={{ textAlign: 'right' }}>
              Todos os campos são obrigatórios
            </p>

            <div className="modal__footer__buttons">
              <button
                type="button"
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

export default Modal;
