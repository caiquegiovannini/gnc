import React from 'react';

import PageHeader from './components/PageHeader';
import Routes from './routes';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <PageHeader />
      <Routes />
    </>
  );
}

export default App;
