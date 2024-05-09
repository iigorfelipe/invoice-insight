import { useMemo, LegacyRef, ForwardRefExoticComponent, forwardRef } from 'react';
import { VariableSizeList, VariableSizeListProps } from 'react-window';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { ParcelasPorMesAno } from '../../types/data';
import { useSettings } from '../../contexts/settings';
import { formatarValorParaMoedaBrasileira } from '../../helpers/formatCurrent';
import PieActiveArc from '../../components/PieChart';


const Home = () => {
  const { parcelas } = useSettings();

  const itemSize = (index: number) => {
    const parcela = parcelas[index];
    const numParcelas = parcela.parcelas.length;
    return numParcelas * 61;
  };

  const ListMemoized: ForwardRefExoticComponent<VariableSizeListProps<any>> = useMemo(() => {
    return forwardRef((props, ref) => (
      <VariableSizeList ref={ref as LegacyRef<VariableSizeList<any>>} {...props}/>
    ));
  }, [parcelas]);


  return (
    <Box
      sx={{
        p: '0px 10%',
        display: "flex",
        flexDirection: 'column',
        gap: '40px',
      }}
    >

      <PieActiveArc />

      <ListMemoized
        itemCount={parcelas.length}
        itemSize={itemSize}
        height={350}
        width='100%'
      >
        {({ index, style }) => {
          const item: ParcelasPorMesAno = parcelas[index];
          return (

            <ListItem
              style={style}
              key={item.mesNome}
              sx={{ display: 'flex', flexDirection: 'column', pl: '0px', m: '0px' }}
            >
              <Divider sx={{ width: '100%' }} />

              <Box sx={{ display: 'flex', width: '100%' }}>

                <Box sx={{ width: '20%', m: '10px auto' }}>

                  <Tooltip
                    title={
                      <Typography>
                        Total deste mês: {formatarValorParaMoedaBrasileira(item.valorTotalDasParcelas)}
                      </Typography>
                    }
                  >
                    <Typography>{item.mesNome}</Typography>
                  </Tooltip>

                </Box>

                <List sx={{ width: '80%' }}>
                  {
                    item.parcelas.map((parcela, index: number) => (

                      <ListItem
                        key={item.mesNome + index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          p: '0px',
                          m: '0px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', gap: '15px' }}>

                            <Avatar sx={{ background: parcela.cor }}>
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
                            <Divider sx={{ width: '100%', m: '10px 0px 10px 0px' }} />
                          )
                        }

                      </ListItem>
                    ))
                  }
                </List>

              </Box>
            </ListItem>
          );
        }}
      </ListMemoized>

    </Box>
  );
};

export default Home;
