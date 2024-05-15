export type Parcela = {
  data: string;
  mesNome: string;
  valorParcela: number;
  parcela: string;
};

export type Fatura = {
  data: string;
  valor_fatura: number;
  vezes: number;
  vencimento: number;
  parcelas: Parcela[];
};

type Contatos = {
  celuar: string;
  email: string;
};

export type ParcelaInfo = {
  idCliente: string;
  valorParcela: number;
  parcela: string;
  cliente: string;
  cor: string;
};

export type Cliente = {
  idCliente: string;
  nome: string;
  cor: string;
  contatos: Contatos;
  faturas: Fatura[];
  historicoDePagamentos: Parcela[] | [];
};

export type ParcelasPorMesAno = {
  mesNome: string;
  data: string;
  parcelas: ParcelaInfo[];
  valorTotalDasParcelas: number;
};

export type ValoresMinMax = {
  minMaxClientes: [number, number];
  minMaxValorDasFaturas: [number, number];
  minMaxParcelasPorFatura: [number, number];
};
