import { useState } from 'react';
import { Button, Box, Tooltip, Typography } from '@mui/material';
import { moedas } from '../../mocks/moedas';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';


const TooltipTitle = () => <Typography>Em breve...</Typography>;

const CurrencySession = () => {
  const [moedaEscolhida, setMoedaEscolhida] = useState(moedas[0]);
  const { corGradiente } = useSettings();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        p: '25px 0px',
        gap: '10px'
      }}
    >

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '30px',
          gap: '10px',
        }}
      >
        {
          moedas.map((moeda) => (
            <Tooltip key={moeda} title={moeda === moedas[0] ? '' : <TooltipTitle />}>
              <span>
                <Button
                  key={moeda}
                  size='small'
                  variant='outlined'
                  onClick={() => setMoedaEscolhida(moeda)}
                  sx={{
                    background: moeda === moedaEscolhida ? corGradiente : 'normal',
                    color: moeda === moedaEscolhida ? obterCorContraste(corGradiente) : 'normal'
                  }}
                  disabled={moeda !== moedas[0]}
                >
                  {moeda}
                </Button>
              </span>
            </Tooltip>
          ))
        }
      </Box>

    </Box>
  );
};

export default CurrencySession;
