import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { fetchCriarConta } from '../services/api';
import '../styles/registro.css';

function Registro() {
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchCriarConta(nomeResponsavel);
    const STATUS_CODE_CREATED = 201;
    if (result.status === STATUS_CODE_CREATED) {
      setError(false);
      navigate('/');
    }
    if (result.status !== STATUS_CODE_CREATED) {
      setError(true);
    }
  };

  const MIN_LENGTH_NOME = 6;
  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="register__alert"
    >
      <p>
        Nome com tamanho inválido&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={ () => setError(false) } variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  return (
    <Container className="container-register">
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
        style={ { maxWidth: '500px', minWidth: '300px' } }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label data-testid="register__label-nome">Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="João da Silva Souza"
            data-testid="register__input-nome"
            onChange={ ({ target }) => setNomeResponsavel(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-testid="register__button-register"
          disabled={
            !(nomeResponsavel.length >= MIN_LENGTH_NOME)
          }
          className="mt-3"
          onClick={ handleClick }
        >
          Registrar
        </Button>
      </Form>
      <p className="paragraph-pagina-inicial">
        Já possui uma conta?&nbsp;
        <a data-testid="paragraph-pagina-inicial" href="/">Entrar</a>
      </p>
      { error && ALERT }
    </Container>
  );
};

export default Registro;
