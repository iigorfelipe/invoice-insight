import { Box, Divider, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { PieChart } from '@mui/x-charts/PieChart';
import { formatarValorParaMoedaBrasileira } from '../../helpers/formatCurrent';
import { useSettings } from '../../contexts/settings';
import { useAppTheme } from '../../contexts/theme';
import Filters from '../filterContent';

const PieChartDisplay = () => {
  const {
    dadosDaFiltragemGeral: { parcelasFiltradas: parcelas },
    coresDoGrafico,
  } = useSettings();

  const { isSmDown, isMdDown } = useAppTheme();

  const valorTotalDoMesAtual = parcelas[0].valorTotalDasParcelas
  let valorTotalMesesRestantes = 0;

  for (let i = 1; i < parcelas.length; i++) {
    valorTotalMesesRestantes += parcelas[i].valorTotalDasParcelas;
  };

  const data = [
    { id: 0, value: valorTotalDoMesAtual, color: coresDoGrafico.corMesAtual },
    { id: 1, value: valorTotalMesesRestantes, color: coresDoGrafico.corProximasFaturas },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMdDown ? 'column' : 'flex',
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

        <Box
          sx={{
            width: isSmDown ? '100%' : '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{            
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <FiberManualRecordIcon sx={{ color: data[0].color, }} />

            <Typography sx={{ m: '0px auto 0px 5px'}}>
              {parcelas[0].mesNome}
            </Typography>
          

            <Typography>
              {formatarValorParaMoedaBrasileira(data[0].value)}
            </Typography>

          </Box>

          <Divider sx={{ m: '10px 0px 10px 0px' }} />

          <Box
            sx={{            
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <FiberManualRecordIcon sx={{color: data[1].color }} />

            <Typography sx={{ m: '0px auto 0px 5px' }}>
              Próximas faturas
            </Typography>

            <Typography>
              {formatarValorParaMoedaBrasileira(data[1].value)}
            </Typography>
    
          </Box>

          <Divider sx={{ m: '10px 0px 10px 0px' }} />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >

            <Typography sx={{ fontWeight: 600, m: '0px auto 0px 5px' }}>
              Total
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {formatarValorParaMoedaBrasileira(data[0].value + data[1].value)}
            </Typography>

          </Box>
        </Box>

      </Box>

      <Divider sx={{width: '100%', m: '35px 0px', display: isMdDown ? 'flex' : 'none'}}/>

      {parcelas[0].valorTotalDasParcelas > 0 && <Filters />}

    </Box>
  );
};

export default PieChartDisplay;
