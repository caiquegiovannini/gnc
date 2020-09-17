import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import NonConformityCard from '../../components/NonConformityCard';
import Modal from '../../components/Modal';

import './styles.css';

function Home() {
  const { BASE_URL } = api;

  const [nonConformities, setNonConformities] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(false);

  // Fetch all departments
  useEffect(() => {
    try {
      fetch(`${BASE_URL}/departments`)
        .then((response) => response.json())
        .then((data) => setDepartments(data));
    } catch (error) {
      console.error(error);
    }
  }, [BASE_URL]);

  // Fetch all non conformities
  useEffect(() => {
    try {
      fetch(`${BASE_URL}/non-conformities`)
        .then((response) => response.json())
        .then((data) => setNonConformities(data));
    } catch (error) {
      console.error(error);
    }
  }, [BASE_URL]);

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
        />
      );
    });
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
        && <Modal handleModal={setModal} allDepartments={departments} />}
    </section>
  );
}

export default Home;
