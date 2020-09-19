import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { BASE_URL } from '../../services/api';
import { fetchData } from '../../services/utils';

import Select from '../../components/Select';
import NonConformityCard from '../../components/NonConformityCard';
import Modal from '../../components/Modal';
import Confirmation from '../../components/Confirmation';

import './styles.css';

function Home() {
  const [allNonConformities, setAllNonConformities] = useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredNonConformities, setFilteredNonConformities] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [nonConformityId, setNonConformityId] = useState(null);

  const filterOptions = allDepartments && [
    ...allDepartments,
    {
      id: 'filterAll',
      name: 'Todos',
    },
  ];

  // Fetch all departments
  useEffect(() => {
    fetchData(`${BASE_URL}/departments`)
      .then((result) => setAllDepartments(result));
  }, []);

  // Fetch all non conformities
  useEffect(() => {
    fetchData(`${BASE_URL}/non-conformities`)
      .then((results) => {
        const sortedResults = results.sort((a, b) => (
          a['ocurrence-date'] < b['ocurrence-date']
            ? 1
            : -1
        ));

        setAllNonConformities(sortedResults);
      });
  }, [modal, deleteConfirmation]);

  // Filter non conformities
  useEffect(() => {
    if (filter && filter !== 'Todos') {
      const filterId = allDepartments.reduce((id, dept) => {
        if (dept.name === filter) {
          return dept.id;
        }
        return id;
      }, null);
      const filteredNC = allNonConformities.filter((nc) => nc.departments.includes(filterId));

      setFilteredNonConformities(filteredNC);
    } else {
      setFilteredNonConformities(allNonConformities);
    }
  }, [allDepartments, allNonConformities, filter]);

  function renderNonConformitiesCards(nonConformities, departments) {
    return nonConformities.map((nonConformity) => {
      const conformityDepartmentsIds = nonConformity.departments;
      const conformityDepartmentsNames = departments.reduce((names, dept) => {
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

  return (
    <section className="home container">
      <ToastContainer />
      <header className="home__header">
        <div className="home__header__filter">
          <Select
            id="filter"
            optionDefault="filtrar por dept."
            options={filterOptions}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={() => setModal(true)}
          className="button button--primary"
        >
          Adicionar
        </button>
      </header>

      <main className="home__list">
        {filteredNonConformities
          ? (
            <>
              <p className="home__list__total">
                Total de
                {' '}
                <strong>{filteredNonConformities.length}</strong>
              </p>
              <section className="home__list__cards">
                {allDepartments
                  && renderNonConformitiesCards(filteredNonConformities, allDepartments)}
              </section>
            </>
          )
          : 'Carregando...'}
      </main>

      {modal && allDepartments
        && (
          <Modal
            closeModal={closeModal}
            allDepartments={allDepartments}
          />
        )}

      {deleteConfirmation
        && (
          <Confirmation
            setConfirmation={setDeleteConfirmation}
            id={nonConformityId}
          />
        )}
    </section>
  );
}

export default Home;
