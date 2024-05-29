import { Box, TextField } from '@mui/material';
import { useAppTheme } from '../../contexts/theme';
import { useSettings } from '../../contexts/settings';
import FilterButtons from './filterButtons';

const CustomizedFilter = () => {
  const {
    parcelas,
    datas,
    setDatas,
    dadosDoCliente,
    datas2,
    setDatas2,
  } = useSettings();
  const { isSmDown } = useAppTheme();

  const obterDataInicial = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  const obterDataFinal = () => {
    const [mes, ano] = parcelas.slice(-1)[0].data.split('/');
    return `${ano}-${mes}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: isSmDown ? 'column' : 'row',
        justifyContent: 'center',
        gap: isSmDown ? '5px' : '10px',
      }}
    >
      <TextField
        type="month"
        inputProps={{ min: obterDataInicial(), max: obterDataFinal() }}
        size="small"
        onChange={({ target: { value } }) => {
          if (dadosDoCliente) {
            setDatas2((prev) => {
              return { ...prev, data1: value };
            });
          } else {
            setDatas((prev) => {
              return { ...prev, data1: value };
            });
          }
        }}
        value={dadosDoCliente ? datas2.data1 : datas.data1}
      />

      <FilterButtons />

      <TextField
        type="month"
        inputProps={{ min: obterDataInicial(), max: obterDataFinal() }}
        size="small"
        onChange={({ target: { value } }) => {
          if (dadosDoCliente) {
            setDatas2((prev) => {
              return { ...prev, data2: value };
            });
          } else {
            setDatas((prev) => {
              return { ...prev, data2: value };
            });
          }
        }}
        value={dadosDoCliente ? datas2.data2 : datas.data2}
      />
    </Box>
  );
};

export default CustomizedFilter;
