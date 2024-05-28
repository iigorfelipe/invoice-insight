import { useState } from 'react';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import Apply from '@mui/icons-material/AutoAwesomeOutlined';
import { MuiColorInput } from 'mui-color-input';
import { useAppTheme } from '../../contexts/theme';
import { useSettings } from '../../contexts/settings';
import { moedas } from '../../mocks/moedas';
import { quantidadesIniciais } from '../../mocks/data';
import { ValoresMinMax } from '../../types/data';
import { obterCorContraste } from '../../helpers/randomColor';

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

type PopoverContentProps = {
  handleClose: () => void;
};

const PopoverContent = ({ handleClose }: PopoverContentProps) => {
  const [moedaEscolhida, setMoedaEscolhida] = useState(moedas[0]);

  const { toggleTheme } = useAppTheme();

  const {
    coresDoGrafico,
    setCoresDoGrafico,
    corGradiente,
    valoresMinMax: {
      minMaxClientes,
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
        borderRadius: '12px',
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

      <Divider sx={{ m: '0px -25px' }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-bewteen', p: '20px 0px', gap: '20px' }}>

        <MuiColorInput
          label='Mês atual'
          sx={{
            maxWidth: '170px',
            "& label.Mui-focused": {
              color: '#fff'
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: coresDoGrafico.corMesAtual
              },
              "&.Mui-focused fieldset": {
                borderColor: coresDoGrafico.corMesAtual
              }
            }
          }}
          format="hex8"
          value={coresDoGrafico.corMesAtual}        
          onChange={(value) => setCoresDoGrafico((prevColors) => {
            return {
              ...prevColors,
              corMesAtual: value
            }
          })}
        />

        <MuiColorInput
          label='Próximas faturas'
          sx={{
            maxWidth: '170px',
            "& label.Mui-focused": {
              color: '#fff'
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: coresDoGrafico.corProximasFaturas
              },
              "&.Mui-focused fieldset": {
                borderColor: coresDoGrafico.corProximasFaturas
              }
            }
          }}
          format="hex8"
          value={coresDoGrafico.corProximasFaturas}
          onChange={(value) => setCoresDoGrafico((prevColors) => {
            return {
              ...prevColors,
              corProximasFaturas: value
            }
          })}
        />

      </Box>

      <Divider sx={{ m: '0px -25px' }} />
  
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

      <Divider sx={{ m: '0px -25px' }} />

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


      <Button
        sx={{
          borderRadius: '8px',
          height: '40px',
          background: corGradiente,
          color: obterCorContraste(corGradiente),
          '&:hover': {
            background: corGradiente,
            color: obterCorContraste(corGradiente)
          }
        }}
        variant='outlined'
        onClick={() => {
          handleClose()
          aplicarNovosValores()
        }}
        endIcon={<Apply />}
      >
        Aplicar valores
      </Button>

    </Box>
  );
};

export default PopoverContent;
