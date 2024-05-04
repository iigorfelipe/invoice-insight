import { Button, Divider, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import { useAppTheme } from '../../contexts/theme';
import { useSettings } from '../../contexts/settings';
import { moedas } from '../../mocks/moedas';
import { quantidadesIniciais } from '../../mocks/data';
import { ValoresMinMax } from '../../types/data';


type RangeSliderProps = {
  title: string;
  label: keyof ValoresMinMax;
  min: number;
  max: number;
};

const RangeSlider = ({ title, label, min, max }: RangeSliderProps) => {
  const [sliderValue, setSliderValue] = useState([min, max]);
  const { setValoresMinMaxLocal } = useSettings();

  const handleChange = (_event: Event, newValue: number | number[]) => {

    setSliderValue(newValue as number[]);

    setValoresMinMaxLocal((prev) => {
      return {
        ...prev,
        [label]: newValue
      }
    });
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

      <Typography>{title}</Typography>

      <Slider
        value={sliderValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={quantidadesIniciais[label][0]}
        max={quantidadesIniciais[label][1]}
      />
    </Box>
  )
};

const PopoverContent = () => {
  const [moedaEscolhida, setMoedaEscolhida] = useState(moedas[0]);
  const { toggleTheme } = useAppTheme();
  const {
    valoresMinMax: {
      minMaxClientes,
      minMaxFaturasPorCliente,
      minMaxParcelasPorFatura,
      minMaxValorDasFaturas
    },
    aplicarNovosValores,
  } = useSettings();

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

      <Divider sx={{ m: '-25px' }} />
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: '90px',
          gap: '10px'
        }}
      >
        <RangeSlider
          title='Clientes'
          label='minMaxClientes'
          min={minMaxClientes[0]}
          max={minMaxClientes[1]}
        />
        <RangeSlider
          title='Faturas por clientes'
          label='minMaxFaturasPorCliente'
          min={minMaxFaturasPorCliente[0]}
          max={minMaxFaturasPorCliente[1]}
        />
        <RangeSlider
          title='Valor das faturas'
          label='minMaxValorDasFaturas'
          min={minMaxValorDasFaturas[0]}
          max={minMaxValorDasFaturas[1]}
        />
        <RangeSlider
          title='Parcelas por fatura'
          label='minMaxParcelasPorFatura'
          min={minMaxParcelasPorFatura[0]}
          max={minMaxParcelasPorFatura[1]}
        />
      </Box>

      <Divider sx={{ m: '-25px' }} />

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

      <Divider sx={{ m: '0px -25px' }} />
  
      <Button
        sx={{
          borderRadius: '8px',
          height: '40px'
        }}
        variant='outlined'
        onClick={aplicarNovosValores}
      >
          Aplicar valores
      </Button>

    </Box>
  );
};

export default PopoverContent;
