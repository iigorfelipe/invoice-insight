import { Button, Box, Divider } from '@mui/material';
import { moedas } from '../../mocks/moedas';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';

const CurrencySession = () => {
  const {
    coresDoGrafico: { corMesAtual, corProximasFaturas },
    cambio: { origem, destino },
    setCambio
  } = useSettings();


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        p: '25px 0px',
        gap: '10px',
      }}
    >

      <Box sx={{ display: 'flex', gap: '10px' }}>
        {
          moedas.slice(0, 3).map(({ codigo, label }) => (
            <Button
              key={codigo + label}
              size='small'
              variant='outlined'
              onClick={() => setCambio((prev) => { return { ...prev, origem: codigo }})}
              sx={{
                background: codigo === origem ? corMesAtual : 'normal',
                color: codigo === origem ? obterCorContraste(corMesAtual) : 'normal',
                width: '50px', p: '0px', m: '0px'
              }}
            >
              {codigo}
            </Button>
          ))
        }
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '30px',
          gap: '10px',
        }}
      >
        {
          moedas.map(({ codigo, label }) => (
            <Button
              key={codigo + label}
              size='small'
              variant='outlined'
              onClick={() => setCambio((prev) => { return { ...prev, destino: codigo }})}
              sx={{
                background: codigo === destino ? corProximasFaturas : 'normal',
                color: codigo === destino ? obterCorContraste(corProximasFaturas) : 'normal',
                width: '50px', p: '0px', m: '0px'
              }}
            >
              {codigo}
            </Button>
          ))
        }
      </Box>
    </Box>
  );
};

export default CurrencySession;
