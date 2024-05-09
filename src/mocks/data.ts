import { opcoesDeClientes } from "../helpers/generateRandomCliente";
import { obterNomeDoMes } from "../helpers/getMouthName";
import { ValoresMinMax } from "../types/data";

const maxClientes = opcoesDeClientes.length;

export const quantidadesIniciais: ValoresMinMax = {
  minMaxClientes: [1, maxClientes],
  minMaxFaturasPorCliente: [1, 4],
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
