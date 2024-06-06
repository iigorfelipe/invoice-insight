export const formatarValorParaMoeda = (valor: number, moeda: string, formato: string): string => {
  const preco = new Intl.NumberFormat(formato, {
    currency: moeda,
    style: 'currency',
    minimumFractionDigits: 2,
  }).format(valor);

  if (moeda === 'CAD') {
    return `CA${preco}`;
  } else if (moeda === 'AUD') {
    return `AU${preco}`;
  } else {
    return preco;
  };
};
