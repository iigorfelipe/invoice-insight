import { ReactNode, useState } from "react";
import { SettingsContext } from "./context";
import { quantidadesIniciais, valorInicialParcelasPorMesAno } from "../../mocks/data";
import useDynamicDataGenerator from "../../hooks/useDynamicDataGenerator";
import { Cliente, ParcelasPorMesAno } from "../../types/data";

type Props = {
  children: ReactNode;
};

const SettingsProvider = ({ children }: Props) => {
  const [valoresMinMax, setValoresMinMax] = useState(quantidadesIniciais);
  const [valoresMinMaxLocal, setValoresMinMaxLocal] = useState(quantidadesIniciais);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [parcelas, setParcelas] = useState<ParcelasPorMesAno[]>([valorInicialParcelasPorMesAno]);

  const aplicarNovosValores = () => {
    setValoresMinMax(valoresMinMaxLocal);
    const { dadosDinamicos, parcelasPorMes } = useDynamicDataGenerator(valoresMinMaxLocal);
    setClientes(dadosDinamicos);
    setParcelas(parcelasPorMes);
  };

  const values = {
    valoresMinMax, setValoresMinMax,
    valoresMinMaxLocal, setValoresMinMaxLocal,
    clientes, setClientes,
    parcelas, setParcelas,
    aplicarNovosValores
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
