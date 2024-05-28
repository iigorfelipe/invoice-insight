import { Parcela, ParcelasPorMesAno } from "./data";

export type DadosDaFiltragem = {
  total: number;
  periodo: string;
  parcelasFiltradas: Parcela[];
};

export type DadosDaFiltragemGeral = {
  total: number;
  periodo: string;
  parcelasFiltradas: ParcelasPorMesAno[];
};
