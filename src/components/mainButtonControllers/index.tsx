import {
  Box,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Apply from '@mui/icons-material/AutoAwesomeOutlined';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';


const MainButtonControllers = () => {
  const {
    corGradiente,
    dadosDaFiltragemGeral: { parcelasFiltradas: parcelas },
    aplicarNovosValores,
  } = useSettings();

  const naoPossuiValor = parcelas[0].valorTotalDasParcelas === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tooltip title={<Typography>Gerar dados aleatoriós</Typography>}>
        <span>
          <IconButton
            disabled={false}
            onClick={aplicarNovosValores}
            size='small'
            sx={{
              borderRadius: naoPossuiValor ? '12px' : '8px',
              background: corGradiente,
              height: naoPossuiValor ? '100%' : '40px',
              width: naoPossuiValor ? '100%' : '40px',
              p: '10px',
              m: '0px',
              gap: '5px',
              display: 'flex',
              flexDirection: naoPossuiValor ? 'column' : 'row',
              color: obterCorContraste(corGradiente)
            }}
          >
            {naoPossuiValor ? 'Gerar dados aleatórios' : null}<Apply />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default MainButtonControllers;
