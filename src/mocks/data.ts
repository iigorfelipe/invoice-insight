import { obterNomeDoMes } from "../helpers/getMouthName";
import { gerarNumeroDeCelularAleatorio } from "../helpers/randomCellNumber";
import { gerarCorAleatoria } from "../helpers/randomColor";
import { ParcelasPorMesAno, Cliente } from "../types/data";

// const opcoesDeClientes = ['Luffy', 'Zoro', 'Nami', 'Usopp', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jinbe']

const clientes: Cliente[] = [
  {
    nome: 'Luffy',
    cor: gerarCorAleatoria(),
    contatos: {
      celuar: gerarNumeroDeCelularAleatorio(),
      email: 'luffy@email.com',
    },
    endereco: {
      estado: 'MA',
      cep: '65091-000',
      cidade: 'São Luís',
      bairro: 'Forquilha',
      rua: 'Estrada de São Cristovão',
      numero: '4',
    },
    faturas: [
      {
        data: '02/04/2024 17:00',
        valor_fatura: 600,
        vezes: 2,
        vencimento: 10,
        parcelas: [
          {
            data: '04/2024',
            mesNome: 'Abril',
            valorParcela: 300,
            parcela: '1/2'
          },
          {
            data: '05/2024',
            mesNome: 'Maio',
            valorParcela: 300,
            parcela: '2/2'
          }
        ]
      },
      {
        data: '11/04/2024 13:00',
        valor_fatura: 80,
        vezes: 1,
        vencimento: 25,
        parcelas: [
          {
            data: '04/2024',
            mesNome: 'Abril',
            valorParcela: 80,
            parcela: '1/1'
          }
        ]
      }
    ],
    historicoDePagamentos: [],
  },
  {
    nome: 'Zoro',
    cor: gerarCorAleatoria(),
    contatos: {
      celuar: gerarNumeroDeCelularAleatorio(),
      email: 'zoro@email.com',
    },
    endereco: {
      estado: 'PE',
      cep: '56999-999',
      cidade: 'Recife',
      bairro: 'Centro',
      rua: 'Rua das flores',
      numero: '1366',
    },
    faturas: [
      {
        data: '28/04/2024 11:34',
        valor_fatura: 1200,
        vezes: 2,
        vencimento: 5,
        parcelas: [
          {
            data: '04/2024',
            mesNome: 'Abril',
            valorParcela: 600,
            parcela: '1/2'
          },
          {
            data: '05/2024',
            mesNome: 'Maio',
            valorParcela: 600,
            parcela: '2/2'
          }
        ]
      },
      {
        data: '11/05/2024 17:04',
        valor_fatura: 100,
        vezes: 1,
        vencimento: 5,
        parcelas: [
          {
            data: '04/2024',
            mesNome: 'Abril',
            valorParcela: 100,
            parcela: '1/1'
          }
        ]
      },
    ],
    historicoDePagamentos: [],
  }
]

const parcelasOrdenadas: ParcelasPorMesAno[] = [];

const agruparParcelasPorMesAno = (mes: number, ano: string) => {
  const parcelasPorMesAno: ParcelasPorMesAno = {
    mesNome: obterNomeDoMes(mes),
    data: `${mes}/${ano}`,
    parcelas: [],
  };

  clientes.forEach(usuario => {
    usuario.faturas.forEach(fatura => {
      fatura.parcelas.forEach(parcela => {
        const [parcelaMes, parcelaAno] = parcela.data.split('/');
        if (parseInt(parcelaMes) === mes && parcelaAno === ano) {
          parcelasPorMesAno.parcelas.push({
            valorParcela: parcela.valorParcela,
            parcela: parcela.parcela,
            cliente: usuario.nome,
            cor: usuario.cor
          });
        }
      });
    });
  });

  return parcelasPorMesAno;
}

const mesesAnos: Set<string> = new Set();
clientes.forEach(usuario => {
  usuario.faturas.forEach(fatura => {
    fatura.parcelas.forEach(parcela => {
      const [mes, ano] = parcela.data.split('/');
      mesesAnos.add(`${mes}/${ano}`);
    });
  });
});


mesesAnos.forEach((mesAno: string) => {
  const [mes, ano] = mesAno.split('/');
  parcelasOrdenadas.push(agruparParcelasPorMesAno(parseInt(mes), ano));
});

export default parcelasOrdenadas;
