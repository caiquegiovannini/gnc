import React from 'react';

import NonConformityCard from '../../components/NonConformityCard';
import Modal from '../../components/Modal';

import './styles.css';

function Home() {
  return (
    <section className="home container">
      <header className="home__header">

        <input
          type="text"
          className="home__header__input"
          list="departments-list"
          placeholder="buscar por dept."
        />
        <datalist id="departments-list">
          <option value="Quality">Quality</option>
          <option value="Management">Management</option>
          <option value="Sales">Sales</option>
        </datalist>

        <button
          type="button"
          className="button button--primary"
        >
          Adicionar
        </button>
      </header>

      <main className="home__list">
        <p className="home__list__total">
          Total de
          {' '}
          <strong>12</strong>
        </p>
        <section className="home__list__cards">
          <NonConformityCard />
          <NonConformityCard />
        </section>
      </main>

      {/* <Modal /> */}
    </section>
  );
}

export default Home;
