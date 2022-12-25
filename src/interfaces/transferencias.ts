export interface transferenciaInterface {
  dataTransferencia: String;
  valor: Number;
  tipo: String;
  nomeOperadorTransacao: null | String;
  contaId: Number;
}

export interface periodoInterface {
  idConta: Number;
  dataInicial: String;
  dataFinal: String;
}

export interface operadorInterface {
  idConta: Number;
  nomeOperadorTransacao: String;
}

export interface filtroCompletoInterface {
  idConta: Number;
  dataInicial: String;
  dataFinal: String;
  nomeOperadorTransacao: String;
}