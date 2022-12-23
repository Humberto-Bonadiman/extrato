import axios from "axios";

const apiConta = axios.create({
  baseURL: "http://localhost:8081/conta",
});

const apiTransferencia = axios.create({
  baseURL: "http://localhost:8081/transferencia",
});

export default { apiConta, apiTransferencia };
