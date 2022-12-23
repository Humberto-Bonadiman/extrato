import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Extrato from '../pages/Extrato';
import PaginaInicial from '../pages/PaginaInicial';

const App: React.FC = () => {
  return useRoutes([
    { path: '/', element: <PaginaInicial /> },
    { path: '/extrato', element: <Extrato /> }
  ]);
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;