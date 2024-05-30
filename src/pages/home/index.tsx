import { Box, Link } from '@mui/material';
import { useSettings } from '../../contexts/settings';
import PieChartDisplay from '../../components/pieChart';
import { useAppTheme } from '../../contexts/theme';
import MainList from '../../components/mainList';
import MainButtonControllers from '../../components/mainButtonControllers';

const Home = () => {
  const { isSmDown } = useAppTheme();
  const {
    dadosDaFiltragemGeral: { parcelasFiltradas: parcelas },
  } = useSettings();

  const naoPossuiParcelas = parcelas[0].valorTotalDasParcelas === 0;

  return (
    <Box
      sx={{
        p: `0px ${isSmDown ? '1%' : '10%'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {naoPossuiParcelas ? null : <PieChartDisplay />}

      <MainButtonControllers />

      <MainList />

      <Link
        href="https://github.com/iigorfelipe/invoice-insight"
        target="_blank"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        Github do projeto
      </Link>
    </Box>
  );
};

export default Home;
