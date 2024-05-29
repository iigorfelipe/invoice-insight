import {
  Box,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Reset from '@mui/icons-material/RotateLeftOutlined';
import Apply from '@mui/icons-material/AutoAwesomeOutlined';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';


const MainButtonControllers = () => {
  const {
    redefinirFiltro,
    corGradiente,
    dadosDaFiltragemGeral: { parcelasFiltradas: parcelas },
    aplicarNovosValores,
    filtroAtivo
  } = useSettings();

  const naoPossuiValor = parcelas[0].valorTotalDasParcelas === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap:'20px'
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

      {
        filtroAtivo === 0 ? null : (
          <Tooltip title={<Typography>Limpar todos os filtros</Typography>}>
            <span>
              <IconButton
                disabled={false}
                onClick={redefinirFiltro}
                size='small'
                sx={{
                  borderRadius: '8px',
                  background: corGradiente,
                  height: '40px',
                  width: '40px',
                  p: '0px',
                  m: '0px',
                  color: obterCorContraste(corGradiente),
                  '&:hover': {
                    background: corGradiente,
                  },                   
                }}
              >
                <Reset />
              </IconButton>
            </span>
          </Tooltip>
        )
      }
    </Box>
  );
};

export default MainButtonControllers;
