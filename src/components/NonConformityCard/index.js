import React from 'react';

import './styles.css';

function NonConformityCard() {
  return (
    <div className="nc-card card">
      <header className="nc-card__header">
        <div className="nc-card__header__info">
          <h3>09/12/2019</h3>
          <h3>Quality, Management</h3>
        </div>
        <div className="nc-card__header__remove">
          X
        </div>
      </header>

      <main className="nc-card__main">
        <p className="nc-card__main__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          blandit finibus quam eu efficitur. Nulla sed nisl sit amet libero
          faucibus gravida quis eu urna. Donec pulvinar a neque sed feugiat.
          Phasellus finibus a elit nec sagittis. Proin tincidunt dolor ante.
          Nulla ac consectetur massa. Donec gravida varius nisl, ac ultricies
          nulla dictum eu. Donec erat quam, vulputate quis elementum non,
          convallis interdum sem. Integer a sem aliquam, elementum mauris non,
          scelerisque lorem. Quisque at felis nec eros eleifend interdum.
          Pellentesque ullamcorper lorem massa, a aliquet nulla sagittis eu.
          Phasellus ut dignissim massa.
        </p>
      </main>

      <footer className="nc-card__footer">
        <p className="nc-card__footer__actions">
          2 ações
        </p>
        <button
          type="button"
          className="button button--primary"
        >
          Gerenciar ações corretivas
        </button>
      </footer>
    </div>
  );
}

export default NonConformityCard;
