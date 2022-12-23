const appJson = 'application/json';
const NUMBER = 8081;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchEncontrarContaPeloId = async (id: number) => {
  const fecthFindAccount = fetch(`http://${URL}:${PORT}/conta/${id}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });
  const response = await fecthFindAccount;
  return response;
}