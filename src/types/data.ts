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

type Endereco = {
  estado: string;
  cep: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
};

type Contatos = {
  celuar: string;
  email: string;
};

type ParcelaInfo = {
  valorParcela: number;
  parcela: string;
  cliente: string;
  cor: string;
};

export type Cliente = {
  nome: string;
  cor: string;
  contatos: Contatos;
  endereco: Endereco;
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
  minMaxFaturasPorCliente: [number, number];
  minMaxValorDasFaturas: [number, number];
  minMaxParcelasPorFatura: [number, number];
};
