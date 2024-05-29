import { createContext } from "react";
import { Cliente, ValoresMinMax, ParcelasPorMesAno } from "../../types/data";
import { coresIniciaisDoGrafico, quantidadesIniciais } from "../../mocks/data";
import { DadosDaFiltragemGeral, DadosDaFiltragemPorCliente, DatasType } from "../../types/filters";

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

  dadosDaFiltragemGeral: DadosDaFiltragemGeral;
  setDadosDaFiltragemGeral: React.Dispatch<React.SetStateAction<DadosDaFiltragemGeral>>;

  redefinirFiltro: () => void;

  corGradiente: string;

  filtroAtivo: number;
  setFiltroAtivo: React.Dispatch<React.SetStateAction<number>>;

  datas: DatasType;
  setDatas: React.Dispatch<React.SetStateAction<DatasType>>;

  dadosDoCliente: Cliente | undefined;
  setDadosDoCliente: React.Dispatch<React.SetStateAction<Cliente | undefined>>;

  dadosDaFiltragemPorCliente: DadosDaFiltragemPorCliente;
  setDadosDaFiltragemPorCliente: React.Dispatch<React.SetStateAction<DadosDaFiltragemPorCliente>>

  filtroAtivo2: number;
  setFiltroAtivo2: React.Dispatch<React.SetStateAction<number>>;

  datas2: DatasType;
  setDatas2: React.Dispatch<React.SetStateAction<DatasType>>;
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

  redefinirFiltro: () => {},

  coresDoGrafico: coresIniciaisDoGrafico,
  setCoresDoGrafico: () => {},

  dadosDaFiltragemGeral: {} as DadosDaFiltragemGeral,
  setDadosDaFiltragemGeral: () => {},

  corGradiente: '',

  filtroAtivo: 0,
  setFiltroAtivo: () => 0,

  datas: { data1: '', data2: '' },
  setDatas: () => {},

  dadosDoCliente: undefined,
  setDadosDoCliente: () => {},

  dadosDaFiltragemPorCliente: {} as DadosDaFiltragemPorCliente,
  setDadosDaFiltragemPorCliente: () => {},

  filtroAtivo2: 0,
  setFiltroAtivo2: () => 0,

  datas2: { data1: '', data2: '' },
  setDatas2: () => {},
};

export const SettingsContext = createContext<DefaultSettingsContext>(defaultSettingsContext);
