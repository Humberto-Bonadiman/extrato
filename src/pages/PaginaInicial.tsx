import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { fetchEncontrarContaPeloNome } from '../services/api';
import Logo from '../images/digital_wallet.png';
import '../styles/paginaInicial.css';

function PaginaInicial() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [error, setError] = useState(false);

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchEncontrarContaPeloNome(nome);
    const GET = 200;
    if (result.status === GET) {
      const body = await result.json();
      localStorage.setItem('id_conta', JSON.stringify(body?.idConta));
      localStorage.setItem('nomeResponsavel', JSON.stringify(body?.nomeResponsavel));
      navigate('/extrato');
    }
    if (result.status !== GET) {
      setError(true);
    }
  };

  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="login__element-invalid-id"
    >
      <p>
        Não existe uma conta com este nome&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={() => setError(false)} variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  return (
    <Container className="container-form">
      <Figure className="container-sm text-center">
        <Figure.Image
          width={ 230 }
          alt="Logo"
          src={ Logo}
          className="rounded-3"
        />
      </Figure>
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
        style={ { maxWidth: '400px', minWidth: '300px' } }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label data-testid="login__label-id-conta">Nome Responsável da Conta</Form.Label>
          <Form.Control
            type="text"
            data-testid="login_input-id-conta"
            onChange={ ({ target }) => setNome(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-testid="login__button-login"
          onClick={ handleClick }
        >
          Entrar
        </Button>
        <br/>
        <Button
          variant="outline-primary"
          type="submit"
          data-testid="login__button-register"
          onClick={ () => { navigate('/registro'); } }
        >
          Ainda não possuo uma conta
        </Button>
      </Form>
      { error && ALERT }
    </Container>
  );
};

export default PaginaInicial;
