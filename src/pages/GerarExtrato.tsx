import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { transferenciaInterface } from '../interfaces/transferencias';
import { fetchTransferencia } from '../services/api';

function GerarExtrato() {
  const navigate = useNavigate();
  const [operador, setOperador] = useState<String | null>(null);
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState('');

  const generateTransaction = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const dateTime = new Date().toLocaleString();
    const id = localStorage.getItem('id_conta') || 0;
    const bodyFunction: transferenciaInterface = {
      dataTransferencia: dateTime,
      valor,
      tipo,
      nomeOperadorTransacao: operador,
      contaId: Number(id),
    };
    const result = await fetchTransferencia(bodyFunction);
    const POST = 201;
    // const body = await result.json();
    if (result.status === POST) {
      navigate('/extrato');
    }
  }

  const submit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h3>Confirme para realizar a operação</h3>
            <button
              className="btn btn-primary"
              onClick={ async () => {
                generateTransaction(event);
                onClose();
                }
              }
              data-testid="transaction-confirm"
            >
              Sim
            </button>
            <button
              data-testid="transaction-deny"
              className="btn btn-primary"
              onClick={ onClose }
            >
              Não
            </button>
            <p>Caso a operação ocorra com sucesso você será redirecionado para a página principal</p>
          </div>
        );
      }
    });
  };

  return(
    <Container className="transaction-form">
      <Form className="form">
      <Form.Group className="mb-3">
          <Form.Label
            data-testid="transaction__label-value"
          >
            Valor Transferência
          </Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min="0"
            data-testid="transaction__value"
            id="transaction__value"
            placeholder="Valor em reais (R$)"
            onChange={ ({ target }) => setValor(Number(target.value)) }
          />
        </Form.Group>
        <Form.Check
          type="radio"
          label="depósito"
          id="radio__deposito"
          value="DEPOSITO"
          onChange={ ({ target }) => setTipo(target.value) }
        />
        <Form.Check
          type="radio"
          label="saque"
          id="radio__saque"
          value="SAQUE"
          onChange={ ({ target }) => setTipo(target.value) }
        />
        <Form.Check
          type="radio"
          label="transferência entrada"
          id="radio__entrada"
          value="ENTRADA"
          onChange={ ({ target }) => setTipo(target.value) }
        />
        <Form.Check
          type="radio"
          label="transferência saída"
          id="radio__saida"
          value="SAIDA"
          onChange={ ({ target }) => setTipo(target.value) }
        />
        <Form.Group className="mb-3">
          <Form.Label
            data-testid="transaction__label-nome"
          >
            Operador da Transação
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="João da Silva Souza"
            data-testid="transaction__nome"
            onChange={ ({ target }) => setOperador(target.value) }
          />
        </Form.Group>
        
        <Button
          data-testid="transaction__button-tranfer"
          id="transaction__button-tranfer"
          variant="primary"
          type="submit"
          onClick={ submit }
        >
          Realizar transferência
        </Button>
        <Button
          variant="outline-primary"
          type="submit"
          className="button-extrato"
          data-testid="button-extrato"
          onClick={ () => { navigate('/extrato'); } }
        >
          Voltar
        </Button>
      </Form>
    </Container>
  );
};

export default GerarExtrato;
