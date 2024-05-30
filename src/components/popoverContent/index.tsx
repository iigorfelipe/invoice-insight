import { Button, Divider, Box } from '@mui/material';
import Apply from '@mui/icons-material/AutoAwesomeOutlined';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';
import PopoverHeader from './header';
import ColorSession from './colorSession';
// import CurrencySession from './currencySession';
import SliderSession from './sliderSession';


const Splitter = () => <Divider sx={{ m: '0px -25px' }} />;

type PopoverContentProps = {
  handleClose: () => void;
};

const PopoverContent = ({ handleClose }: PopoverContentProps) => {

  const {
    corGradiente,
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

      <PopoverHeader />

      <Splitter />
      
      <ColorSession />

      {/* <Splitter />
  
      <CurrencySession /> */}

      <Splitter />

      <SliderSession />

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
