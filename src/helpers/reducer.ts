import { ParcelasPorMesAno } from "../types/data"

const valorInicial = 0;

export const valorTotalDasParcelas = (parcelas: ParcelasPorMesAno[]) => {
  return parcelas.reduce((acumulador, { valorTotalDasParcelas }) => acumulador + valorTotalDasParcelas, valorInicial)
};
