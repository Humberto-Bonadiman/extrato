import React from 'react';
import { useEffect } from "react";
import { Table } from "react-bootstrap";

interface ExtratosI {
  id: number;
  dataTransferencia: String;
  valor: number;
  tipo: string;
  nomeOperadorTransacao: number;
  contaId: number;
}

interface IProps {
  extratos: ExtratosI[];
}

const TabelaExtratos: React.FC<IProps> = ({ extratos }) => {
  console.log(extratos);
  const allExtratos = () => {
    if (extratos.length > 0 && Array.isArray(extratos)) {
      const extratosUser = extratos.map(({
        id,
        dataTransferencia,
        valor,
        tipo,
        nomeOperadorTransacao
      }, index) => {
        return(
          <tr key={ id }>
            <td data-testid={`table-id-${index + 1}`}>{id}</td>
            <td data-testid={`table-data-transferencia-${index + 1}`}>{dataTransferencia}</td>
            <td data-testid={`table-valor-${index + 1}`}>{valor}</td>
            <td data-testid={`table-tipo-${index + 1}`}>{tipo}</td>
            <td data-testid={`table-nome-operador-${index + 1}`}>{ nomeOperadorTransacao }</td>
          </tr>
        );
      });
      return extratosUser;
    }
    return [];
  };

  useEffect(() => {
    allExtratos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table data-testid="transition-table" responsive="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>Data Transferência</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Nome Operador Transacionado</th>
        </tr>
      </thead>
      <tbody>
        { allExtratos() }
      </tbody>
    </Table>
  );
};

export default TabelaExtratos;
