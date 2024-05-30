const diferencaEmMeses = (data1: string, data2: string): number => {
  const parseDate = (dataStr: string): Date => {
    const [mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1);
  };

  const d1 = parseDate(data1);
  const d2 = parseDate(data2);

  const diferencaEmAno = d2.getFullYear() - d1.getFullYear();
  const diferencaEmMes = d2.getMonth() - d1.getMonth();

  return diferencaEmAno * 12 + diferencaEmMes + 1;
};
