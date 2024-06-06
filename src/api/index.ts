type CurrencyData = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

type ExchangeRatesResponse = {
  [key: string]: CurrencyData;
};

// const newUrl = "https://economia.awesomeapi.com.br/last/BRL-USD,BRL-EUR,BRL-AUD,BRL-CAD,BRL-JPY,BRL-CNY,BRL-GBP,USD-BRL,USD-EUR,USD-JPY,USD-CAD,USD-AUD,USD-CNY,USD-GBP,CAD-BRL,CAD-USD,CAD-EUR,EUR-BRL,EUR-GBP,EUR-JPY,EUR-AUD,EUR-CAD,EUR-CNY,EUR-USD,GBP-BRL,GBP-USD,GBP-EUR,JPY-BRL,JPY-USD,JPY-EUR,AUD-BRL,AUD-USD,AUD-EUR,CNY-BRL,CNY-USD,CNY-EUR"
const API_URL = 'https://economia.awesomeapi.com.br/last/';

export const obterTaxasDeCambio = async (moedaOrigem: string, moedaDestino: string): Promise<ExchangeRatesResponse | null> => {

  try {
    const url = `${API_URL}${moedaOrigem}-${moedaDestino}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao buscar taxas de câmbio');
    };

    const data: ExchangeRatesResponse = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    return null;
  };
};
