import React, { useEffect, useState } from 'react';
import { Button, Container, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TabelaExtratos from '../components/TabelaExtratos';
import { filtroCompletoInterface, operadorInterface, periodoInterface } from '../interfaces/transferencias';
import { fetchEncontrarTransferencias, fetchFiltroOperador, fetchFiltroOperadorPeriodo, fetchFiltroPeriodo } from '../services/api';
import '../styles/extrato.css';

const Extrato: React.FC = () => {
  const navigate = useNavigate();
  const [extratos, setExtratos] = useState([]);
  const [nome, setNome] = useState('');
  const [periodoInicial, setPeriodoInicial] = useState('');
  const [periodoFinal, setPeriodoFinal] = useState('');
  const [error, setError] = useState(false);

  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="extrato__element-invalid-checkbox"
    >
      <p>
        Alguma coisa deu errada! Verifique se os dados estão corretos.&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={() => setError(false)} variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  const findByPeriod = async (id: Number) => {
    const filtro: periodoInterface = {
      idConta: id,
      dataInicial: periodoInicial,
      dataFinal: periodoFinal,
    }
    const result = await fetchFiltroPeriodo(filtro);
    const POST = 200;
    if (result.status === POST) {
      const body = await result.json();
      setExtratos(body);
      localStorage.setItem('extratos', JSON.stringify(body));
    }
    if (result.status !== POST) {
      setError(true);
    }
  }

  const findByName = async (id: Number) => {
    const filtro: operadorInterface = {
      idConta: id,
      nomeOperadorTransacao: nome,
    }
    const result = await fetchFiltroOperador(filtro);
    const POST = 200;
    if (result.status === POST) {
      const body = await result.json();
      setExtratos(body);
      localStorage.setItem('extratos', JSON.stringify(body));
    }
    if (result.status !== POST) {
      setError(true);
    }
  }

  const findByNameAndPeriod = async (id: Number) => {
    const filtro: filtroCompletoInterface = {
      idConta: id,
      dataInicial: periodoInicial,
      dataFinal: periodoFinal,
      nomeOperadorTransacao: nome,
    }
    const result = await fetchFiltroOperadorPeriodo(filtro);
    const POST = 200;
    if (result.status === POST) {
      const body = await result.json();
      setExtratos(body);
      localStorage.setItem('extratos', JSON.stringify(body));
    }
    if (result.status !== POST) {
      setError(true);
    }
  }

  const encontrarExtratos = async () => {
    const id = localStorage.getItem('id_conta') || '';
    const result = await fetchEncontrarTransferencias(Number(id));
    const body = await result.json();
    setExtratos(body);
    localStorage.setItem('extratos', JSON.stringify(body));
  }

  const search = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const id = Number(localStorage.getItem('id_conta') || 0);
    if (periodoInicial !== '' && nome === '') {
      findByPeriod(id);
    }
    if (periodoInicial === '' && nome !== '') {
      findByName(id);
    }
    if (periodoInicial !== '' && nome !== '') {
      findByNameAndPeriod(id);
    }
    if (periodoInicial === '' && nome === '') {
      encontrarExtratos();
    }
  }

  useEffect(() => {
    encontrarExtratos();
  }, []);

  return(
    <div>
      <Container className="inputs-container">
        <Form.Group className="mb-3">
          <Form.Label
            data-testid="transaction__label-nome"
          >
            Data de início
          </Form.Label>
          <Form.Control
            type="date"
            placeholder="DD/MM/YYYY"
            data-testid="transaction__nome"
            onChange={ ({ target }) => {
              setPeriodoInicial(target.value);
              setPeriodoFinal(target.value);
            } }
          />
          <Form.Label
            data-testid="transaction__label-nome"
          >
            Data de fim
          </Form.Label>
          <Form.Control
            type="date"
            placeholder="DD/MM/YYYY"
            data-testid="transaction__nome"
            onChange={ ({ target }) => setPeriodoFinal(target.value) }
          />
          <Form.Label
            data-testid="transaction__label-nome"
          >
            Nome Operador Transacionado
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="João da Silva Souza"
            data-testid="transaction__nome"
            onChange={ ({ target }) => setNome(target.value) }
          />
        </Form.Group>
      </Container>
      <Container className="buttons-container">
        <Button
          variant="outline-primary"
          type="submit"
          data-testid="extrato__button-search"
          onClick={ search }
        >
          Pesquisar
        </Button>
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
      { error && ALERT }
    </div>
  );
};

export default Extrato;
