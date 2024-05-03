import { obterValorEntreMinMax } from "./getRandomNumber";

export const gerarDataFatura = (): string => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth() + 1;
  const dia = obterValorEntreMinMax(1, agora.getDate());
  const hora = obterValorEntreMinMax(0, 23);
  const minuto = obterValorEntreMinMax(0, 59);

  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
};

export const gerarDataParcela = (numeroParcela: number): string => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth() + 1 + numeroParcela;
  const mesFormatado = mes % 12 === 0 ? 12 : mes % 12;
  const anoFormatado = ano + Math.floor(mes / 12);

  return `${mesFormatado.toString().padStart(2, '0')}/${anoFormatado}`;
};
