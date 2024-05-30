import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useSettings } from '../../contexts/settings';
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
        width: '100%',
      }}
    >

      <Typography>{title}</Typography>

      <Slider
        value={sliderValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={quantidadesIniciais[label][0]}
        max={quantidadesIniciais[label][1]}
        step={label === 'minMaxValorDasFaturas' ? 100 : 1}
      />
    </Box>
  )
};


const SliderSession = () => {

  const {
    valoresMinMax: {
      minMaxClientes,
      minMaxParcelasPorFatura,
      minMaxValorDasFaturas
    },
  } = useSettings();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        p: '25px 0px'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <RangeSlider
          title='Clientes'
          label='minMaxClientes'
          min={minMaxClientes[0]}
          max={minMaxClientes[1]}
        />

        <Box sx={{ m: '0px 5px' }} />

        <RangeSlider
          title='Parcelas por fatura'
          label='minMaxParcelasPorFatura'
          min={minMaxParcelasPorFatura[0]}
          max={minMaxParcelasPorFatura[1]}
        />

      </Box>

      <RangeSlider
        title='Valor das faturas'
        label='minMaxValorDasFaturas'
        min={minMaxValorDasFaturas[0]}
        max={minMaxValorDasFaturas[1]}
      />
    </Box>
  );
};

export default SliderSession;
