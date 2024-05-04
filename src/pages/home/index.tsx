import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import PieActiveArc from '../../components/PieChart';
import { formatarValorParaMoedaBrasileira } from '../../helpers/formatCurrent';
import { useSettings } from '../../contexts/settings';

const Home = () => {
  const { parcelas } = useSettings();

  return (
    <Box sx={{ p: '0px 15%', pt: '60px' }}>

      <PieActiveArc />

      <List sx={{ mt: '40px' }}>
        {
          parcelas.map((item) => (
            <ListItem
              key={item.mesNome}
              sx={{ display: 'flex', flexDirection: 'column', p: '0px', m: '0px' }}
            >

              <Divider sx={{width: '100%' }} />

              <Box sx={{ display: 'flex', width: '100%' }}>

              <Box sx={{ width: '20%', m: '10px auto' }}>

                <Tooltip
                  title={
                    <Typography>Total deste mês: {formatarValorParaMoedaBrasileira(item.valorTotalDasParcelas)}</Typography>
                  }
                >

                <Typography>
                  {item.mesNome}
                </Typography>

                </Tooltip>
      
              </Box>

                <List sx={{ width: '80%' }}>
                  {
                    item.parcelas.map((parcela, index) => (

                      <ListItem
                        key={item.mesNome + index}
                        sx={{
                          display:"flex",
                          flexDirection: 'column',
                          width: '100%',
                          p: '0px',
                          m: '0px',
                        }}
                      >

                        <Box
                          sx={{
                            display:"flex",
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'                          
                          }}
                        >
                          <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', gap: '15px' }}>

                            <Avatar sx={{background: parcela.cor}}>
                              {parcela.cliente[0]}
                            </Avatar>

                            <Typography>{parcela.cliente}</Typography>

                          </Box>

                          <Typography>{parcela.parcela}</Typography>

                          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>

                            <Typography>
                              {formatarValorParaMoedaBrasileira(parcela.valorParcela)}
                            </Typography>

                          </Box>
                        </Box>

                        {
                          item.parcelas.length !== index + 1 && (
                            <Divider sx={{width: '100%', m: '10px 0px 10px 0px' }} />
                          )
                        }

                      </ListItem>
                    ))
                  }
                </List>

              </Box>

            </ListItem>
          ))
        }
      </List>
    </Box>
  );
};

export default Home;
