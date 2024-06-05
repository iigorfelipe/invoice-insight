import { ReactNode, useCallback, useEffect, useState } from "react";
import { SettingsContext } from "./context";
import {
  coresIniciaisDoGrafico,
  dadosIniciaisDaFiltragem,
  dadosIniciaisDaFiltragemCliente,
  datasIniciais,
  quantidadesIniciais,
  valorInicialParcelasPorMesAno
} from "../../mocks/data";
import useDynamicDataGenerator from "../../hooks/useDynamicDataGenerator";
import { Cliente, ParcelasPorMesAno } from "../../types/data";
import { DadosDaFiltragemGeral, DadosDaFiltragemCliente, DatasType } from "../../types/filters";
import { valorTotalDasParcelas } from "../../helpers/reducer";
import { Cambio, cambioInicial, moedas } from "../../mocks/moedas";
import { formatarValorParaMoeda } from "../../helpers/formatCurrent";
import { obterTaxaDecambio } from "../../fetchers/getExchangeRate";

type Props = {
  children: ReactNode;
};

const SettingsProvider = ({ children }: Props) => {
  const [valoresMinMax, setValoresMinMax] = useState(quantidadesIniciais);
  const [valoresMinMaxLocal, setValoresMinMaxLocal] = useState(quantidadesIniciais);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [parcelas, setParcelas] = useState<ParcelasPorMesAno[]>([valorInicialParcelasPorMesAno]);

  const [coresDoGrafico, setCoresDoGrafico] = useState(coresIniciaisDoGrafico);

  const [filtroAtivo, setFiltroAtivo] = useState(0);
  const [datas, setDatas] = useState<DatasType>(datasIniciais);
  const [dadosDaFiltragemGeral, setDadosDaFiltragemGeral] = useState<DadosDaFiltragemGeral>(dadosIniciaisDaFiltragem);

  const [dadosDoCliente, setDadosDoCliente] = useState<Cliente | undefined>(undefined);  
  const [dadosDaFiltragemCliente, setDadosDaFiltragemCliente] = useState<DadosDaFiltragemCliente>(dadosIniciaisDaFiltragemCliente);
  const [filtroAtivoCliente, setFiltroAtivoCliente] = useState(0);
  const [datasCliente, setDatasCliente] = useState<DatasType>(datasIniciais);

  const [cambio, setCambio] = useState<Cambio>(cambioInicial);

  const obterNovoValor = useCallback((valor: number) => {
    const { destino, taxa, formato } = cambio;
    const novoTotal = valor * taxa;
    return formatarValorParaMoeda(novoTotal, destino, formato);
  }, [cambio.origem, cambio.destino, cambio.taxa, cambio.formato]);

  useEffect(() => {
    const { origem, destino } = cambio;

    if (origem !== destino) {

      const formatarValor = async () => {
        const taxaOrigemDestino = await obterTaxaDecambio(cambio.origem, cambio.destino);

        if (taxaOrigemDestino) {
          let novoFormato = 'pt-BR';
          let novaMoeda = 'BRL';

          moedas.forEach((item) => {
            if (item.codigo === cambio.destino) {
              novoFormato = item.formato;
              novaMoeda = item.codigo
            };
          });

          setCambio((prev) => {
            return {
              ...prev,
              destino: novaMoeda,
              taxa: taxaOrigemDestino,
              formato: novoFormato
            }
          });
        };
      };
      formatarValor();

    } else if (origem === destino) {
      setCambio((prev) => { return { ...prev, taxa: 1 }})
    };
  }, [cambio.origem, cambio.destino]);

  const corGradiente = `linear-gradient(to right bottom, ${coresDoGrafico.corMesAtual}, ${coresDoGrafico.corProximasFaturas})`;

  const redefinirFiltro = () => {
    if (dadosDoCliente) {

      const { parcelas: parcelasDoCliente } = dadosDoCliente?.faturas[0]

      const [mes, ano] = parcelasDoCliente.slice(-1)[0].data.split('/');

      setDadosDaFiltragemCliente({
        parcelasFiltradas: parcelasDoCliente.map((item) => item),
        periodo: `${ano}-${mes}`,
        total: parcelasDoCliente[0].valorParcela * parcelasDoCliente.length
      });
  
      setFiltroAtivoCliente(0);
      setDatasCliente(datasIniciais);

    } else {
      const [mes, ano] = parcelas.slice(-1)[0].data.split('/');

      setDadosDaFiltragemGeral({
        parcelasFiltradas: parcelas.map((item) => item),
        periodo: `${ano}-${mes}`,
        total: valorTotalDasParcelas(parcelas)
      });
  
      setFiltroAtivo(0);
      setDatas(datasIniciais);
    };
  };

  const aplicarNovosValores = () => {
    redefinirFiltro();
    setValoresMinMax(valoresMinMaxLocal);
    const { dadosDinamicos, parcelasPorMes } = useDynamicDataGenerator(valoresMinMaxLocal);
    const [mes, ano] = parcelas.slice(-1)[0].data.split('/');

    setDadosDaFiltragemGeral({
      parcelasFiltradas: parcelasPorMes.map((item) => item),
      periodo: `${ano}-${mes}`,
      total: valorTotalDasParcelas(parcelasPorMes)
    });

    setClientes(dadosDinamicos);
    setParcelas(parcelasPorMes);
  };

  const values = {
    valoresMinMax, setValoresMinMax,
    valoresMinMaxLocal, setValoresMinMaxLocal,
    clientes, setClientes,
    parcelas, setParcelas,
    aplicarNovosValores,
    redefinirFiltro,
    coresDoGrafico,
    setCoresDoGrafico,
    dadosDaFiltragemGeral, setDadosDaFiltragemGeral,
    corGradiente,
    filtroAtivo, setFiltroAtivo,
    datas, setDatas,
    dadosDoCliente, setDadosDoCliente,

    dadosDaFiltragemCliente, setDadosDaFiltragemCliente,
    filtroAtivoCliente, setFiltroAtivoCliente,
    datasCliente, setDatasCliente,
    cambio, setCambio,
    obterNovoValor
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
