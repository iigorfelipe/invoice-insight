import { Cliente, ValoresMinMax, Fatura, Parcela, ParcelasPorMesAno } from "../types/data";
import { gerarNumeroDeCelularAleatorio } from "../helpers/randomCellNumber";
import { gerarCorAleatoria } from "../helpers/randomColor";
import { obterNomeDoMes } from "../helpers/getMouthName";
import { obterValorEntreMinMax } from "../helpers/getRandomNumber";
import { gerarNomeAleatorio } from "../helpers/generateRandomCliente";
import { gerarDataFatura, gerarDataParcela } from "../helpers/generateDate";
import { gerarId } from "../helpers/generateIds";

const gerarDadosDeClientes = (valoresMinMax: ValoresMinMax): Cliente[] => {
  const { minMaxClientes, minMaxValorDasFaturas, minMaxParcelasPorFatura } = valoresMinMax;

  const [minClientes, maxClientes] = minMaxClientes;
  const [minValorDasFaturas, maxValorDasFaturas] = minMaxValorDasFaturas;
  const [minParcelasPorFatura, maxParcelasPorFatura] = minMaxParcelasPorFatura;

  const clientes: Cliente[] = [];
  const nomesUsados: Set<string> = new Set();

  for (let i = 0; i < obterValorEntreMinMax(minClientes, maxClientes); i++) {
    let nomeCliente = gerarNomeAleatorio();

    while (nomesUsados.has(nomeCliente)) {
      nomeCliente = gerarNomeAleatorio();
    }

    nomesUsados.add(nomeCliente);

    const cliente: Cliente = {
      idCliente:  gerarId(nomeCliente),
      nome: nomeCliente,
      cor: gerarCorAleatoria(),
      contatos: {
        celuar: gerarNumeroDeCelularAleatorio(),
        email: `${nomeCliente.toLowerCase()}@email.com`,
      },
      faturas: [],
      historicoDePagamentos: [],
    };

    const dataFatura = gerarDataFatura();
    const fatura: Fatura = {
      data: dataFatura, 
      valor_fatura: obterValorEntreMinMax(minValorDasFaturas, maxValorDasFaturas),
      vezes: obterValorEntreMinMax(minParcelasPorFatura, maxParcelasPorFatura),
      vencimento: +dataFatura[0],
      parcelas: [],
    };

    for (let k = 0; k < fatura.vezes; k++) {
      const dataParcela = gerarDataParcela(k);
      const [mes, _] = dataParcela.split('/');

      const parcela: Parcela = {
        data: dataParcela,
        mesNome: obterNomeDoMes(+mes),
        valorParcela: Math.floor(fatura.valor_fatura / fatura.vezes),
        parcela: `${k + 1}/${fatura.vezes}`,
      };
      fatura.parcelas.push(parcela);
    };

    cliente.faturas.push(fatura);

    clientes.push(cliente);
  };

  return clientes;
};

const useGeraradorDeDadosDinamicos = (valoresMinMaxLocal: ValoresMinMax) => {

  const dadosDinamicos = gerarDadosDeClientes(valoresMinMaxLocal);
  const parcelasPorMes: ParcelasPorMesAno[] = [];

  const agruparParcelasPorMesAno = (mes: number, ano: string) => {
    const parcelasPorMesAno: ParcelasPorMesAno = {
      mesNome: `${obterNomeDoMes(mes)} - ${ano}`,
      data: `${mes}/${ano}`,
      parcelas: [],
      valorTotalDasParcelas: 0,
    };

    dadosDinamicos.forEach((cliente) => {
      cliente.faturas.forEach((fatura) => {
        fatura.parcelas.forEach((parcela) => {
          const [parcelaMes, parcelaAno] = parcela.data.split('/');
          if (parseInt(parcelaMes) === mes && parcelaAno === ano) {
            parcelasPorMesAno.parcelas.push({
              valorParcela: parcela.valorParcela,
              parcela: parcela.parcela,
              cliente: cliente.nome,
              cor: cliente.cor,
              idCliente: cliente.idCliente
            });

            parcelasPorMesAno.valorTotalDasParcelas += parcela.valorParcela;
          }
        });
      });
    });

    return parcelasPorMesAno;
  }

  const mesesAnos: Set<string> = new Set();
  dadosDinamicos.forEach((cliente) => {
    cliente.faturas.forEach((fatura) => {
      fatura.parcelas.forEach((parcela) => {
        const [mes, ano] = parcela.data.split('/');
        mesesAnos.add(`${mes}/${ano}`);
      });
    });
  });


  mesesAnos.forEach((mesAno: string) => {
    const [mes, ano] = mesAno.split('/');
    parcelasPorMes.push(agruparParcelasPorMesAno(parseInt(mes), ano));
  });

  return { dadosDinamicos, parcelasPorMes };
};

export default useGeraradorDeDadosDinamicos;
