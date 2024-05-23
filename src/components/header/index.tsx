import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton, Popover } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PopoverContent from '../popoverContent';

const Header = () => {
  const navigate = useNavigate();
  const rotaAtual = useLocation();

  const isHomePage = rotaAtual.pathname === '/';

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    isHomePage ? setAnchorEl(event.currentTarget) : navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <Box sx={{ display: 'flex', p: '10px' }}>
  
      <Box>
          
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
        >
          {isHomePage ? <SettingsOutlinedIcon /> : <ArrowBackOutlinedIcon />}
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
  
    </Box>
  );
};

export default Header;
