import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { moedas } from '../../mocks/moedas';


const CurrencySession = () => {
  const [moedaEscolhida, setMoedaEscolhida] = useState(moedas[0]);

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

      <Box sx={{ display: 'flex' }}>
        <Typography>Moeda: {moedaEscolhida}</Typography>
      </Box>

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
            <Button
              key={moeda}
              size='small'
              variant='outlined'
              onClick={() => setMoedaEscolhida(moeda)}
            >
              {moeda}
            </Button>
          ))
        }
      </Box>

    </Box>
  );
};

export default CurrencySession;
