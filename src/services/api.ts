import { filtroCompletoInterface, operadorInterface, periodoInterface, transferenciaInterface } from "../interfaces/transferencias";

const appJson = 'application/json';
const NUMBER = 8081;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchEncontrarContaPeloId = async (id: number) => {
  const fecthEncontrarConta = fetch(`http://${URL}:${PORT}/conta/${id}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });
  const response = await fecthEncontrarConta;
  return response;
};

export const fetchEncontrarContaPeloNome = async (nomeResponsavel: String) => {
  const url = `http://${URL}:${PORT}/conta?nomeResponsavel=${nomeResponsavel}`;
  const fecthEncontrarConta = fetch(url, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });
  const response = await fecthEncontrarConta;
  return response;
}

export const fetchCriarConta = async (nomeResponsavel: string) => {
  const fecthCriar = fetch(`http://${URL}:${PORT}/conta`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      nomeResponsavel
    }),
  });
  const response = await fecthCriar;
  return response;
};

export const fetchEncontrarTransferencias = async (contaId: number) => {
  const fetchEncontrar = fetch(`http://${URL}:${PORT}/transferencia/id-conta/${contaId}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });
  const response = await fetchEncontrar;
  return response;
};

export const fetchTransferencia = async (body: transferenciaInterface) => {
  const fetchTransferir = fetch(`http://${URL}:${PORT}/transferencia`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify(body),
  });
  const response = await fetchTransferir;
  return response;
}

export const fetchFiltroPeriodo = async (periodo: periodoInterface) => {
  const fetchTransferir = fetch(`http://${URL}:${PORT}/transferencia/periodo`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify(periodo),
  });
  const response = await fetchTransferir;
  return response;
}

export const fetchFiltroOperador = async (operador: operadorInterface) => {
  const fetchTransferir = fetch(`http://${URL}:${PORT}/transferencia/operador`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify(operador),
  });
  const response = await fetchTransferir;
  return response;
}

export const fetchFiltroOperadorPeriodo = async (filtro: filtroCompletoInterface) => {
  const url = `http://${URL}:${PORT}/transferencia/operador/periodo`;
  const fetchTransferir = fetch(url, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify(filtro),
  });
  const response = await fetchTransferir;
  return response;
}