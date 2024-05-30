import { opcoesDeClientes } from "../helpers/generateRandomCliente";
import { obterNomeDoMes } from "../helpers/getMouthName";
import { ValoresMinMax } from "../types/data";
import { DadosDaFiltragemGeral, DadosDaFiltragemCliente, DatasType } from "../types/filters";

const maxClientes = opcoesDeClientes.length;

export const quantidadesIniciais: ValoresMinMax = {
  minMaxClientes: [1, maxClientes],
  minMaxValorDasFaturas: [100, 100000],
  minMaxParcelasPorFatura: [1, 36],
};

const agora = new Date();
const anoAtual = agora.getFullYear();
const mesAtual = agora.getMonth() + 1;

export const valorInicialParcelasPorMesAno = {
  mesNome: obterNomeDoMes(mesAtual),
  data: `${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
  parcelas: [],
  valorTotalDasParcelas: 0
};

export const coresIniciaisDoGrafico = {
  corMesAtual: 'purple',
  corProximasFaturas: 'blue'
};


export const datasIniciais: DatasType = {
  data1: '',
  data2: '',
};

export const dadosIniciaisDaFiltragem: DadosDaFiltragemGeral = {
  total: 0,
  periodo: '',
  parcelasFiltradas: [{
    valorTotalDasParcelas: 0,
    data: '',
    mesNome: '',
    parcelas: [],
  }]
};

export const dadosIniciaisDaFiltragemCliente: DadosDaFiltragemCliente = {
  total: 0,
  periodo: '',
  parcelasFiltradas: [{
    data: '',
    mesNome: '',
    valorParcela: 0,
    parcela: '',
  }],
};