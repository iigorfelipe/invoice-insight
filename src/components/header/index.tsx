import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton, Popover } from '@mui/material';
import ThemeIcon from '@mui/icons-material/Brightness4Outlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';
import PopoverContent from '../popoverContent';
import { useSettings } from '../../contexts/settings';
import { useAppTheme } from '../../contexts/theme';

const Header = () => {
  const { toggleTheme } = useAppTheme();
  const { setDadosDoCliente, redefinirFiltro } = useSettings();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  const navigate = useNavigate();
  const rotaAtual = useLocation();
  const isHomePage = rotaAtual.pathname === '/invoice-insight';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isHomePage) {
      setAnchorEl(event.currentTarget);
    } else {
      setDadosDoCliente(undefined);
      redefinirFiltro();
      navigate('/');
    };
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px' }}>
  
      <Box>
          
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
        >
          {isHomePage ? <SettingsIcon /> : <ArrowBackIcon />}
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left', 
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <PopoverContent handleClose={handleClose} />
        </Popover>

      </Box>

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
  );
};

export default Header;
