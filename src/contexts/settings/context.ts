import { createContext } from "react";
import { Cliente, ValoresMinMax, ParcelasPorMesAno } from "../../types/data";
import { coresIniciaisDoGrafico, dadosIniciaisDaFiltragem, dadosIniciaisDaFiltragemCliente, datasIniciais, quantidadesIniciais } from "../../mocks/data";
import { DadosDaFiltragemGeral, DadosDaFiltragemCliente, DatasType } from "../../types/filters";
import { Cambio, cambioInicial } from "../../mocks/moedas";

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

  dadosDaFiltragemCliente: DadosDaFiltragemCliente;
  setDadosDaFiltragemCliente: React.Dispatch<React.SetStateAction<DadosDaFiltragemCliente>>

  filtroAtivoCliente: number;
  setFiltroAtivoCliente: React.Dispatch<React.SetStateAction<number>>;

  datasCliente: DatasType;
  setDatasCliente: React.Dispatch<React.SetStateAction<DatasType>>;

  cambio: Cambio;
  setCambio: React.Dispatch<React.SetStateAction<Cambio>>;

  obterNovoValor: (valor: number) => string;
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

  dadosDaFiltragemGeral: dadosIniciaisDaFiltragem,
  setDadosDaFiltragemGeral: () => {},

  corGradiente: '',

  filtroAtivo: 0,
  setFiltroAtivo: () => 0,

  datas: datasIniciais,
  setDatas: () => {},

  dadosDoCliente: undefined,
  setDadosDoCliente: () => {},

  dadosDaFiltragemCliente: dadosIniciaisDaFiltragemCliente,
  setDadosDaFiltragemCliente: () => {},

  filtroAtivoCliente: 0,
  setFiltroAtivoCliente: () => 0,

  datasCliente: datasIniciais,
  setDatasCliente: () => {},

  cambio: cambioInicial,
  setCambio: () => {},

  obterNovoValor: () => '',
};

export const SettingsContext = createContext<DefaultSettingsContext>(defaultSettingsContext);
