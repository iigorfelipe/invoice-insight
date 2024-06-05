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
// const CACHE_KEY = 'taxasDeCambio';
// const CACHE_TIME_KEY = 'taxasDeCambioTime';

export const obterTaxasDeCambio = async (moedaOrigem: string, moedaDestino: string): Promise<ExchangeRatesResponse | null> => {
  // const now = new Date().getTime();
  // const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
  // const cachedRates = localStorage.getItem(CACHE_KEY);

  // if (cachedRates && cacheTime && (now - parseInt(cacheTime) < 3600000)) {
  //   return JSON.parse(cachedRates);
  // }

  try {
    const url = `${API_URL}${moedaOrigem}-${moedaDestino}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao buscar taxas de câmbio');
    };

    const data: ExchangeRatesResponse = await response.json();
    // localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    // localStorage.setItem(CACHE_TIME_KEY, now.toString());
    return data;

  } catch (error) {
    console.error(error);
    return null;
  };
};
