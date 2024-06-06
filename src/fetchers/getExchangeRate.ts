import { obterTaxasDeCambio } from "../api";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos;

export const obterTaxaDecambio = async (moedaOrigem: string, moedaDestino: string) => {
  const chaveTaxa = `${moedaOrigem}${moedaDestino}`;
  const cachedData = localStorage.getItem(chaveTaxa);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const cachedTime = parsedData.timestamp;

    if (Date.now() - cachedTime < CACHE_DURATION) {
      return parseFloat(parsedData.data[`${moedaOrigem}${moedaDestino}`].bid);
    };
  };

  const taxas = await obterTaxasDeCambio(moedaOrigem, moedaDestino);
  if (!taxas) {
    return null;
  };


  const taxaOrigemDestino = parseFloat(taxas[chaveTaxa].bid);
  if (!taxaOrigemDestino) {
    return null;
  };

  localStorage.setItem(chaveTaxa, JSON.stringify({ data: taxas, timestamp: Date.now() }));

  return taxaOrigemDestino;
};
