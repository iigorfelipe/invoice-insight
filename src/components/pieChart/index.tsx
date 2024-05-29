import { Box, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSettings } from '../../contexts/settings';
import { useAppTheme } from '../../contexts/theme';
import Filters from '../filters';
import PieChartInfo from './pieChartInfo';


const PieChartDisplay = () => {
  const {
    dadosDaFiltragemGeral: { parcelasFiltradas: parcelasGeral },
    coresDoGrafico,
    dadosDoCliente,
    dadosDaFiltragemPorCliente: { parcelasFiltradas: parcelasCliente },
  } = useSettings();
  
  const { isSmDown, isMdDown } = useAppTheme();

  const valorTotalMesAtual = dadosDoCliente
  ? parcelasCliente[0].valorParcela
  : parcelasGeral[0].valorTotalDasParcelas;
  
  const totalRestanteGeral = parcelasGeral.slice(1).reduce((acc, parcela) => acc += parcela.valorTotalDasParcelas, 0);
  const totalRestanteCliente = parcelasCliente.slice(1).reduce((acc, parcela) => acc += parcela.valorParcela, 0);

  const valorTotalMesesRestantes = dadosDoCliente ? totalRestanteCliente : totalRestanteGeral;
  const color = dadosDoCliente ? dadosDoCliente.cor : coresDoGrafico.corProximasFaturas;

  const data = [
    { id: 0, value: valorTotalMesAtual, color: coresDoGrafico.corMesAtual },
    { id: 1, value: valorTotalMesesRestantes, color },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMdDown || dadosDoCliente?.idCliente ? 'column' : 'flex',
        alignItems: "center",
        justifyContent: 'space-around',
      }}
    >
      
      <Box sx={{ display: 'flex' }}>
  
        <PieChart
          series={[{
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { additionalRadius: -15, color: 'gray' },
            innerRadius: 25,     
          }]}
          height={150}
          width={220}
          margin={{ left: isSmDown ? 50 : 0, top: 0, right: isSmDown ? 50 : 0 }}
        />

        <PieChartInfo data={data} />

      </Box>

      <Divider
        sx={{
          width: '100%',
          m: '35px 0px',
          display: isMdDown || dadosDoCliente?.idCliente ? 'flex' : 'none'
        }}
      />

      {parcelasGeral[0].valorTotalDasParcelas > 0 && <Filters />}

    </Box>
  );
};

export default PieChartDisplay;
