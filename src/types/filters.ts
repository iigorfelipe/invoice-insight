import { Parcela } from "./data";

export type DadosDaFiltragem = {
  total: number;
  periodo: string;
  parcelasFiltradas: Parcela[];
};
