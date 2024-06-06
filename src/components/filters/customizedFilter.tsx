import { Box, TextField } from '@mui/material';
import { useAppTheme } from '../../contexts/theme';
import { useSettings } from '../../contexts/settings';
import FilterButtons from './filterButtons';
import { obterDataFinal, obterDataInicial } from '../../helpers/getDatePeriod';

const CustomizedFilter = () => {
  const {
    parcelas: parcelasGeral,
    datas,
    setDatas,
    dadosDoCliente,
    datasCliente,
    setDatasCliente,
  } = useSettings();
  const { isSmDown } = useAppTheme();

  const parcelas = dadosDoCliente ? dadosDoCliente?.faturas[0].parcelas : parcelasGeral;

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
        inputProps={{ min: obterDataInicial(), max: obterDataFinal(parcelas) }}
        size="small"
        onChange={({ target: { value } }) => {
          if (dadosDoCliente) {
            setDatasCliente((prev) => {
              return { ...prev, data1: value };
            });
          } else {
            setDatas((prev) => {
              return { ...prev, data1: value };
            });
          }
        }}
        value={dadosDoCliente ? datasCliente.data1 : datas.data1}
      />

      <FilterButtons />

      <TextField
        type="month"
        inputProps={{ min: obterDataInicial(), max: obterDataFinal(parcelas) }}
        size="small"
        onChange={({ target: { value } }) => {
          if (dadosDoCliente) {
            setDatasCliente((prev) => {
              return { ...prev, data2: value };
            });
          } else {
            setDatas((prev) => {
              return { ...prev, data2: value };
            });
          }
        }}
        value={dadosDoCliente ? datasCliente.data2 : datas.data2}
      />
    </Box>
  );
};

export default CustomizedFilter;
