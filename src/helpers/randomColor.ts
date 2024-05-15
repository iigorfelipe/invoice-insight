export const gerarCorAleatoria = () => {
  let cor = ((1 << 24) * Math.random() | 0).toString(16);
  cor = cor.padStart(6, '0');
  return "#" + cor;
};

export const obterCorContraste = (cor: string) => {
  cor = cor.replace('#', '');

  const r = parseInt(cor.substring(0,2), 16) / 255;
  const g = parseInt(cor.substring(2,4), 16) / 255;
  const b = parseInt(cor.substring(4,6), 16) / 255;

  const luminancia = (r * 0.299 + g * 0.587 + b * 0.114);

  const pontoMedio = 0.5;
  const corContraste = (luminancia > pontoMedio) ? '#000000' : '#FFFFFF';

  // Garante que a cor de contraste tenha seis dígitos hexadecimais
  return corContraste.padStart(7, '0');
};
