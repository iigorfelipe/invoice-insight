import { Parcela, ParcelasPorMesAno } from "./data";

export type DadosDaFiltragemCliente = {
  total: number;
  periodo: string;
  parcelasFiltradas: Parcela[];
};

export type DadosDaFiltragemGeral = {
  total: number;
  periodo: string;
  parcelasFiltradas: ParcelasPorMesAno[];
};

export type DatasType = { data1: string; data2: string; }

export type LocalType = {
  parcelas: ParcelasPorMesAno[] | Parcela[];
  datas: DatasType;
};
