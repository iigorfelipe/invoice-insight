import { Box, Typography as Text } from '@mui/material';
import PredefinedFilters from './predefinedFilter';
import CustomizedFilter from './customizedFilter';

const Filters = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Text>Filtre por períodos predefinidos</Text>

          <PredefinedFilters />

          <Text>Ou um período personalizado</Text>

          <CustomizedFilter />

        </Box>
      </Box>
    </Box>
  );
};

export default Filters;
