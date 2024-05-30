import { ParcelasPorMesAno } from '../types/data';

export const obterDataInicial = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}`;
};

export const obterDataFinal = (parcelas: ParcelasPorMesAno[]) => {
  const [mes, ano] = parcelas.slice(-1)[0].data.split('/');
  return `${ano}-${mes}`;
};