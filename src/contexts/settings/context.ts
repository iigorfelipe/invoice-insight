import { createContext } from "react";
import { Cliente, ValoresMinMax, ParcelasPorMesAno } from "../../types/data";
import { coresIniciaisDoGrafico, quantidadesIniciais } from "../../mocks/data";

export type CoresDoGrafico = {
  corMesAtual: string;
  corProximasFaturas: string;
};

export type DefaultSettingsContext = {
  valoresMinMax: ValoresMinMax;
  setValoresMinMax: React.Dispatch<React.SetStateAction<ValoresMinMax>>;

  valoresMinMaxLocal: ValoresMinMax;
  setValoresMinMaxLocal: React.Dispatch<React.SetStateAction<ValoresMinMax>>;

  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;

  parcelas: ParcelasPorMesAno[];
  setParcelas: React.Dispatch<React.SetStateAction<ParcelasPorMesAno[]>>;

  aplicarNovosValores: () => void;

  coresDoGrafico: CoresDoGrafico;

  setCoresDoGrafico: React.Dispatch<React.SetStateAction<CoresDoGrafico>>;

};

export const defaultSettingsContext: DefaultSettingsContext = {
  valoresMinMax: quantidadesIniciais,
  setValoresMinMax: () => {},

  valoresMinMaxLocal: quantidadesIniciais,
  setValoresMinMaxLocal: () => {},

  clientes: [],
  setClientes: () => {},

  parcelas: [],
  setParcelas: () => {},

  aplicarNovosValores: () => {},

  coresDoGrafico: coresIniciaisDoGrafico,
  setCoresDoGrafico: () => {}
};

export const SettingsContext = createContext<DefaultSettingsContext>(defaultSettingsContext);
