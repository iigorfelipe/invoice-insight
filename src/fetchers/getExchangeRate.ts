import { obterTaxasDeCambio } from "../api";

export const obterTaxaDecambio = async (moedaOrigem: string, moedaDestino: string) => {
  const taxas = await obterTaxasDeCambio(moedaOrigem, moedaDestino);
  if (!taxas) {
    return null;
  };

  const chaveTaxa = `${moedaOrigem}${moedaDestino}`;
  const taxaOrigemDestino = parseFloat(taxas[chaveTaxa].bid);
  if (!taxaOrigemDestino) {
    return null;
  };

  return taxaOrigemDestino;
};
