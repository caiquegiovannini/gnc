import React from 'react';
import { ToastContainer } from 'react-toastify';

import PageHeader from './components/PageHeader';
import Routes from './routes';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <PageHeader />
      <Routes />
    </>
  );
}

export default App;
