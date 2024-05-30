import { IconButton, Typography, Box } from '@mui/material';
import ThemeIcon from '@mui/icons-material/Brightness4Outlined';

import { useAppTheme } from '../../contexts/theme';


const PopoverHeader = () => {

  const { toggleTheme } = useAppTheme();
  return (
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
          <ThemeIcon />
        </IconButton>

      </Box>
    </Box>
  );
};

export default PopoverHeader;
