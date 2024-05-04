import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Popover } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PopoverContent from '../popoverContent';

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <Box
      sx={{
        display: 'flex',
        p: '10px',
        position: 'fixed',
        width: '100%',
      }}
    >

      {true && (
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackOutlinedIcon />
        </IconButton>
      )}
  
      <Box sx={{ ml: 'auto' }}>

        <IconButton aria-describedby={id} onClick={handleClick}>
          <SettingsOutlinedIcon />
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
          <PopoverContent />
        </Popover>

      </Box>
  
    </Box>
  );
};

export default Header;
