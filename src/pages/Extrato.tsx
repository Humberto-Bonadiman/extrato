import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../app/hooks';
import TabelaExtratos from '../components/TabelaExtratos';
import { fetchEncontrarTransferencias } from '../services/api';
import '../styles/extrato.css';

const Extrato: React.FC = () => {
  const navigate = useNavigate();
  const [extratos, setExtratos] = useState([]);
  // const [error, setError] = useState(false);

  /* const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="extrato__element-invalid-checkbox"
    >
      <p>
        Pelo menos um dos checkboxs deve estar marcado&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={() => setError(false)} variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  ); */

  useEffect(() => {
    const encontrarExtratos = async () => {
      const id = localStorage.getItem('id_conta') || '';
      const result = await fetchEncontrarTransferencias(Number(id));
      const body = await result.json();
      setExtratos(body);
      localStorage.setItem('extratos', JSON.stringify(body));
    }
    encontrarExtratos();
  }, []);

  return(
    <div>
      <Container className="buttons-container">
        <Button
          variant="outline-primary"
          type="submit"
          data-testid="extrato__button-navigate"
          onClick={ () => { navigate('/gerar-extrato'); } }
        >
          Realizar Transferência
        </Button>
      </Container>
      <TabelaExtratos extratos={ extratos } />
    </div>
  );
};

export default Extrato;
