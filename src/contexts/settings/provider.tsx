import { ReactNode, useState } from "react";
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
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
