import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import PieActiveArc from '../../components/PieChart';
import { formatarValorParaMoedaBrasileira } from '../../helpers/formatCurrent';
import parcelasOrdenadas from '../../mocks/data';

const data = [
  { id: 0, value: 7327, color: 'purple' },
  { id: 1, value: 19729, color: 'blue' },
];

const Home = () => {
  return (
    <Box sx={{ p: '0px 15%' }}>

      <PieActiveArc data={data} />

      <List sx={{ mt: '40px' }}>
        {
          parcelasOrdenadas.map((item) => (
            <ListItem key={item.data} sx={{display: 'flex', flexDirection: 'column', p: '0px', m: '0px'}}>

              <Divider sx={{width: '100%'}} />

              <Box  sx={{ display: 'flex', width: '100%' }}>

                <Box sx={{ width: '20%', m: '10px auto'}}>{item.mesNome}</Box>

                <List sx={{ width: '80%' }}>
                  {
                    item.parcelas.map((parcela, index) => (

                      <ListItem
                        key={parcela.cliente + parcela.parcela}
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
                          <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <Avatar sx={{background: parcela.cor}}>{parcela.cliente[0]}</Avatar>
                            <Typography>{parcela.cliente}</Typography>
                          </Box>

                          <Typography>{parcela.parcela}</Typography>

                          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                            <Typography>
                              {formatarValorParaMoedaBrasileira(parcela.valorParcela)}
                            </Typography>
                          </Box>
                        </Box>

                        {
                          item.parcelas.length !== index + 1 && (
                            <Divider sx={{width: '100%', m: '10px 0px 10px 0px'}} />
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
