import { Box, Divider, IconButton, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PieChart } from '@mui/x-charts/PieChart';
import { formatarValorParaMoedaBrasileira } from '../../helpers/formatCurrent';
import { useSettings } from '../../contexts/settings';


const PieChartDisplay = () => {
  const { parcelas } = useSettings();
  
  const valorTotalDoMesAtual = parcelas[0].valorTotalDasParcelas
  let valorTotalMesesRestantes = 0;

  for (let i = 1; i < parcelas.length; i++) {
    valorTotalMesesRestantes += parcelas[i].valorTotalDasParcelas;
  };

  const data = [
    { id: 0, value: valorTotalDoMesAtual, color: 'purple' },
    { id: 1, value: valorTotalMesesRestantes, color: 'blue' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >

      <Box
        sx={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            color: data[0].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >

          <Box sx={{ display: 'flex', gap: '5px' }}>

            <FiberManualRecordIcon color="inherit" />

            <Typography sx={{color: '#fff'}}>
              {parcelas[0].mesNome}
            </Typography>

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

            <Typography sx={{color: '#fff'}}>
              {formatarValorParaMoedaBrasileira(data[0].value)}
            </Typography>

            <IconButton sx={{p: '5px'}}>
              <ChevronRightIcon/>
            </IconButton>

          </Box>

        </Box>

        <Divider sx={{ m: '10px 0px 10px 0px' }} />

        <Box sx={{ color: data[1].color, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Box sx={{ display: 'flex', gap: '5px' }}>

            <FiberManualRecordIcon color="inherit" />
  
            <Typography sx={{color: '#fff'}}>
              Próximas faturas
            </Typography>

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
  
            <Typography sx={{color: '#fff'}}>
              {formatarValorParaMoedaBrasileira(data[1].value)}
            </Typography>

            <IconButton sx={{p: '5px'}}>
              <ChevronRightIcon/>
            </IconButton>

          </Box>
        </Box>
      </Box>

      <Box>
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { additionalRadius: -15, color: 'gray' },
              innerRadius: 50,            
            }
          ]}
          height={150}
          width={250}
          sx={{ ml: '200px'}}
        />
      </Box>
    </Box>
  );
};

export default PieChartDisplay;
