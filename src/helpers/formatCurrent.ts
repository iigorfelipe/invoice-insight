export const formatarValorParaMoeda = (valor: number, moeda: string, formato: string): string => {
  const preco = new Intl.NumberFormat(formato, {
    currency: moeda,
    style: 'currency',
    minimumFractionDigits: 2,
  });

  return preco.format(valor);
};
