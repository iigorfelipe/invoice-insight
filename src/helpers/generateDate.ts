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
  let ano = agora.getFullYear();
  let mes = agora.getMonth() + 1 + numeroParcela;

  if (mes > 12) {
    ano += Math.floor((mes - 1) / 12);
    mes = (mes - 1) % 12 + 1;
  };

  return `${mes.toString().padStart(2, '0')}/${ano}`;
};
