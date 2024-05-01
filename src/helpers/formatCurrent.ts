const formatarValorParaMoedaBrasileira = (valor: number): string => {
  const preco = new Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2,
  });

  return preco.format(+valor);
}

export {
  formatarValorParaMoedaBrasileira
};
