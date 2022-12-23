import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Extrato from '../pages/Extrato';
import GerarExtrato from '../pages/GerarExtrato';
import PaginaInicial from '../pages/PaginaInicial';
import Registro from '../pages/Registro';

const App: React.FC = () => {
  return useRoutes([
    { path: '/', element: <PaginaInicial /> },
    { path: '/extrato', element: <Extrato /> },
    { path: '/registro', element: <Registro /> },
    { path: '/gerar-extrato', element: <GerarExtrato /> }
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