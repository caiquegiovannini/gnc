import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import utils from '../../services/utils';

import NonConformityCard from '../../components/NonConformityCard';
import Modal from '../../components/Modal';
import Confirmation from '../../components/Confirmation';

import './styles.css';

function Home() {
  const { BASE_URL } = api;
  const { fetchData } = utils;

  const [nonConformities, setNonConformities] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [nonConformityId, setNonConformityId] = useState(null);

  // Fetch all departments
  useEffect(() => {
    fetchData(`${BASE_URL}/departments`)
      .then((result) => setDepartments(result));
  }, [BASE_URL, fetchData]);

  // Fetch all non conformities
  useEffect(() => {
    fetchData(`${BASE_URL}/non-conformities`)
      .then((results) => {
        const sortedResults = results.sort((a, b) => (
          a['ocurrence-date'] < b['ocurrence-date']
            ? 1
            : -1
        ));

        setNonConformities(sortedResults);
      });
  }, [BASE_URL, fetchData, modal, deleteConfirmation]);

  function renderNonConformitiesCards(allNonConformities, allDepartments) {
    return allNonConformities.map((nonConformity) => {
      const conformityDepartmentsIds = nonConformity.departments;
      const conformityDepartmentsNames = allDepartments.reduce((names, dept) => {
        if (conformityDepartmentsIds.includes(dept.id)) {
          return [
            ...names,
            dept.name,
          ];
        }
        return names;
      }, []);

      return (
        <NonConformityCard
          key={nonConformity.id}
          data={nonConformity}
          departments={conformityDepartmentsNames}
          setConfirmation={setDeleteConfirmation}
          setId={setNonConformityId}
        />
      );
    });
  }

  function closeModal() {
    setModal(false);
  }

  function handleDelete() {

  }

  return (
    <section className="home container">
      <header className="home__header">

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="home__header__filter"
        >
          <option value="" disabled hidden>filtrar por dept.</option>
          <option value="Todos">Todos</option>
          {departments && departments.map(({ id, name }) => (
            <option key={id} value={name}>{name}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setModal(true)}
          className="button button--primary"
        >
          Adicionar
        </button>
      </header>

      <main className="home__list">
        {nonConformities && departments
          ? (
            <>
              <p className="home__list__total">
                Total de
                {' '}
                <strong>{nonConformities.length}</strong>
              </p>
              <section className="home__list__cards">
                {renderNonConformitiesCards(nonConformities, departments)}
              </section>
            </>
          )
          : 'Carregando...'}
      </main>

      {modal && departments
        && (
          <Modal
            closeModal={closeModal}
            allDepartments={departments}
          />
        )}

      {deleteConfirmation
        && (
          <Confirmation
            setConfirmation={setDeleteConfirmation}
            handleDelete={handleDelete}
            id={nonConformityId}
          />
        )}
    </section>
  );
}

export default Home;
