import { Box } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { useSettings } from '../../contexts/settings';
import { CoresDoGrafico } from '../../contexts/settings/context';

const CORES = [
  {
    key: 'corMesAtual',
    label: 'Mês atual'
  },
  {
    key: 'corProximasFaturas',
    label: 'Próximas faturas'
  }
];

const ColorSession = () => {

  const {
    coresDoGrafico,
    setCoresDoGrafico,
  } = useSettings();


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-bewteen', p: '20px 0px', gap: '20px' }}>

      {
        CORES.map(({ key, label }) => (
          <MuiColorInput
            key={key}
            label={label}
            sx={{
              maxWidth: '170px',
              "& label.Mui-focused": {
                color: '#fff'
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: coresDoGrafico[key as unknown as keyof CoresDoGrafico] 
                },
                "&.Mui-focused fieldset": {
                  borderColor: coresDoGrafico[key as unknown as keyof CoresDoGrafico]
                }
              }
            }}
            format="hex8"
            value={coresDoGrafico[key as unknown as keyof CoresDoGrafico]}        
            onChange={(value) => setCoresDoGrafico((prevColors) => {
              return {
                ...prevColors,
                [key]: value
              }
            })}
          />
        ))
      }

    </Box>
  );
};

export default ColorSession;
