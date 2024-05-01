import { Button, Divider, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import { useAppTheme } from '../../contexts/theme';


type RangeSliderProps = {
  label: string;
  min: number;
  max: number;
};

const RangeSlider = ({ label, min, max }: RangeSliderProps) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        p: '10px 20px',
      }}
    >

      <Typography>{label}</Typography>

      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </Box>
  )
};

const moedas = ['R$', 'US$', 'AUD', 'CAD', '€', '£', '¥', 'CNY']

const PopoverContent = () => {
  const [moedaEscolhida, setMoedaEscolhida] = useState(moedas[0]);
  const { toggleTheme } = useAppTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        borderRadius: '12px',
        gap: '25px',
        p: '0px 25px 25px 25px'
      }}
    >

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '10px'
        }}
      >
        <Typography>Configurações</Typography>
        <Box
          sx={{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography>Tema</Typography>

          <IconButton
            onClick={toggleTheme}
            sx={{
              width: '40px',
              height: '40px',
              display: 'flex',
            }}
          >
            <Brightness4OutlinedIcon />
          </IconButton>
  
        </Box>
      </Box>

      <Divider sx={{m: '-25px'}} />
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: '90px',
          gap: '10px'
        }}
      >
        <RangeSlider label='Clientes' min={5} max={10} />
        <RangeSlider label='Faturas por clientes' min={5} max={10} />
        <RangeSlider label='Valor das faturas' min={5} max={10} />
        <RangeSlider label='Parcelas por fatura' min={5} max={10} />
      </Box>

      <Divider sx={{m: '-25px'}} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          p: '10px 10px 15px 10px',
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
                sx={{width: '70px'}}
                onClick={() => setMoedaEscolhida(moeda)}
              >
                {moeda}
              </Button>
            ))
          }
        </Box>

      </Box>

      <Divider sx={{m: '0px -25px'}} />
  
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button sx={{width: '200px', borderRadius: '8px', height: '40px'}} variant='outlined'>
          Gerar valores aleatórios
        </Button>
        <Button sx={{width: '200px', borderRadius: '8px', height: '40px'}} variant='outlined'>
          Aplicar valores
        </Button>
      </Box>

    </Box>
  );
};

export default PopoverContent;
