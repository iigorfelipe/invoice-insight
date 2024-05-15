let contador = 0;

export const gerarId = (prefixo = 'id') => {
  contador++;
  return '_' + prefixo + '_' + Date.now() + '_' + contador;
};
