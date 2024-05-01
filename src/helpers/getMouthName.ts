const meses = [
  { numero: 1, nome: 'Janeiro' },
  { numero: 2, nome: 'Fevereiro' },
  { numero: 3, nome: 'Março' },
  { numero: 4, nome: 'Abril' },
  { numero: 5, nome: 'Maio' },
  { numero: 6, nome: 'Junho' },
  { numero: 7, nome: 'Julho' },
  { numero: 8, nome: 'Agosto' },
  { numero: 9, nome: 'Setembro' },
  { numero: 10, nome: 'Outubro' },
  { numero: 11, nome: 'Novembro' },
  { numero: 12, nome: 'Dezembro' }
];

export const obterNomeDoMes = (numeroMes: number) => {
  const mes = meses.find((mes) => mes.numero === numeroMes)?.nome ?? 'Mês'
  return mes;
};
