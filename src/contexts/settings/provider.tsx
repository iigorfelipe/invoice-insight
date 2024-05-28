import { ReactNode, useState } from "react";
import { SettingsContext } from "./context";
import { coresIniciaisDoGrafico, quantidadesIniciais, valorInicialParcelasPorMesAno } from "../../mocks/data";
import useDynamicDataGenerator from "../../hooks/useDynamicDataGenerator";
import { Cliente, ParcelasPorMesAno } from "../../types/data";
import { DadosDaFiltragemGeral } from "../../types/filters";
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
  const [datas, setDatas] = useState({
    data1: '',
    data2: '',
  });

  const corGradiente = `linear-gradient(to right bottom, ${coresDoGrafico.corMesAtual}, ${coresDoGrafico.corProximasFaturas})`;
  
  const [dadosDaFiltragemGeral, setDadosDaFiltragemGeral] = useState<DadosDaFiltragemGeral>({
    total: 0,
    periodo: '',
    parcelasFiltradas: [{
      valorTotalDasParcelas: 0,
      data: '',
      mesNome: '',
      parcelas: [],
    }],
  });

  const redefinirFiltro = () => {
    const [mes, ano] = parcelas.slice(-1)[0].data.split('/');

    setDadosDaFiltragemGeral({
      parcelasFiltradas: parcelas.map((item) => item),
      periodo: `${ano}-${mes}`,
      total: valorTotalDasParcelas(parcelas)
    });

    setFiltroAtivo(0);
    setDatas({
      data1: '',
      data2: ''
    })
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
    datas, setDatas
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
