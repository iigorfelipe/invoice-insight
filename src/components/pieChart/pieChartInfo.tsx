import { Box, Divider, Typography } from '@mui/material';
import OrbIcon from '@mui/icons-material/FiberManualRecord';
import { formatarValorParaMoedaBrasileira } from '../../helpers/formatCurrent';
import { useSettings } from '../../contexts/settings';
import { useAppTheme } from '../../contexts/theme';

type PieChartInfoProps = {
  data: {
    id: number;
    value: number;
    color: string;
  }[];
};

const PieChartInfo = ({ data }: PieChartInfoProps ) => {
  const {
    dadosDaFiltragemGeral: { parcelasFiltradas: parcelasGeral },
    dadosDoCliente,
    dadosDaFiltragemCliente: { parcelasFiltradas: parcelasCliente },
  } = useSettings();

  const { isSmDown } = useAppTheme();

  return (
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

        <OrbIcon sx={{ color: data[0].color, }} />

        <Typography sx={{ m: '0px auto 0px 5px'}}>
          {
            dadosDoCliente ? parcelasCliente[0].mesNome : parcelasGeral[0].mesNome
          }
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

        <OrbIcon sx={{color: data[1].color }} />

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
  );
};

export default PieChartInfo;
