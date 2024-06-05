export type Moeda = { codigo: string, label: string, formato: string };

// const CODIGOS_VALIDOS = [
//   'BRL-USD',
//   'BRL-EUR',
//   'BRL-AUD',
//   'BRL-CAD',
//   'BRL-JPY',
//   'BRL-CNY',
//   'BRL-GBP',
//   'USD-BRL',
//   'USD-EUR',
//   'USD-JPY',
//   'USD-CAD',
//   'USD-AUD',
//   'USD-CNY',
//   'USD-GBP',
//   'CAD-BRL',
//   'CAD-USD',
//   'CAD-EUR',
//   'EUR-BRL',
//   'EUR-GBP',
//   'EUR-JPY',
//   'EUR-AUD',
//   'EUR-CAD',
//   'EUR-CNY',
//   'EUR-USD',
//   'GBP-BRL',
//   'GBP-USD',
//   'GBP-EUR',
//   'JPY-BRL',
//   'JPY-USD',
//   'JPY-EUR',
//   'AUD-BRL',
//   'AUD-USD',
//   'AUD-EUR',
//   'CNY-BRL',
//   'CNY-USD',
//   'CNY-EUR',
// ]

// const moedasDeOrigem = ['BRL', 'USD', 'EUR'];

// const combinacoesPermitidas = {
//   'BRL': ['USD', 'EUR', 'AUD', 'CAD', 'JPY', 'CNY', 'GBP'],
//   'USD': ['BRL', 'EUR', 'JPY', 'CAD', 'AUD', 'CNY', 'GBP'],
//   'EUR': ['BRL', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY', 'USD'],
//   'CAD': ['BRL', 'USD', 'EUR'],
//   'AUD': ['BRL', 'USD', 'EUR'],
//   'GBP': ['BRL', 'USD', 'EUR'],
//   'JPY': ['BRL', 'USD', 'EUR'],
//   'CNY': ['BRL', 'USD', 'EUR'],
// };

export const moedas: Moeda[] = [
  { codigo: 'BRL', label: 'R$', formato: 'pt-BR', },
  { codigo: 'USD', label: 'US$', formato: 'en-US', },
  { codigo: 'EUR', label: '€', formato: 'de-DE', },
  { codigo: 'AUD', label: 'AUD', formato: 'en-AU', },
  { codigo: 'CAD', label: 'CAD', formato: 'en-CA', },
  { codigo: 'GBP', label: '£', formato: 'en-GB', },
  { codigo: 'JPY', label: '¥', formato: 'ja-JP', },
  { codigo: 'CNY', label: 'CNY', formato: 'zh-CN', },
];

// type MoedasOrigemDestino = {
//   title: string;
//   key: 'origem' | 'destino'
// }

// export const moedasOrigemDestino: MoedasOrigemDestino[] = [
//   { title: 'De:', key: 'origem' },
//   { title: 'Para:', key: 'destino' }
// ]

export type Cambio = {
  origem: string;
  destino: string;
  taxa: number;
  formato: string;
};

export const cambioInicial = {
  origem: moedas[0].codigo,
  destino: moedas[0].codigo,
  formato: moedas[0].formato,
  taxa: 1,
};
