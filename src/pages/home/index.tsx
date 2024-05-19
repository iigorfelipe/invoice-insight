import { useEffect, useRef, useState } from 'react';
import { VariableSizeList } from 'react-window';
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
import { obterCorContraste } from '../../helpers/randomColor';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../../contexts/theme';


const Home = () => {
  const listRef = useRef<VariableSizeList>(null);

  const [alturaDaLista, setAlturaDaLista] = useState(350);
  const { parcelas } = useSettings();
  const { isMdDown } = useAppTheme();


  const itemSize = (index: number) => {
    const parcela = parcelas[index];
    const numParcelas = parcela.parcelas.length;
    return numParcelas * 61;
  };
  
  const navigate = useNavigate();
  const redirectToUserDetailPage = (idCliente: string) => {
    navigate(`/user/${idCliente}`)
  };


  useEffect(() => {
    const atualizarAlturaDaLista = () => {
      const alturaDaTela = window.innerHeight;
      const alturaAcimaDaLista = 250; // 58 (header) + 152 (PieActiveArc) + 40 (gap)
      const alturaDinamicaDaLista = alturaDaTela - alturaAcimaDaLista;

      setAlturaDaLista(alturaDinamicaDaLista);

      if (listRef.current) {
        listRef.current.resetAfterIndex(0);
      };
    };

    atualizarAlturaDaLista();

    window.addEventListener('resize', atualizarAlturaDaLista);

    return () => {
      window.removeEventListener('resize', atualizarAlturaDaLista);
    };
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

      <VariableSizeList
        ref={listRef}
        itemCount={parcelas.length}
        itemSize={itemSize}
        height={alturaDaLista}
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
                    placement='bottom-start'
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
                          <Box sx={{ width: '50%' }}>

                            <Tooltip
                              title={
                                <Box
                                  sx={{
                                    p: '10px',
                                    color: obterCorContraste(parcela.cor),
                                  }}
                                >
                                  <Typography>
                                    Total: {formatarValorParaMoedaBrasileira(+parcela.parcela.split('/')[1] * (parcela.valorParcela))}
                                  </Typography>
                                </Box>
                              }
                              placement={isMdDown ? 'top-start' : 'left'}
                              componentsProps={{
                                tooltip: {                                    
                                  sx: { background: parcela.cor, borderRadius: '20px' }
                                }
                              }}
                            >
                              <Box>
                                <Tooltip
                                  title={isMdDown ? '' : <Typography>Clique para mais detalhes</Typography>}
                                  placement='right'
                                  componentsProps={{
                                    tooltip: {
                                      sx: { background: 'transparent' }
                                    }
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '15px',                                
                                      width: '40%',
                                      cursor: 'pointer',
                                      borderRadius: '20px',
                                      '&:hover': {
                                        background: isMdDown ? '' : parcela.cor,
                                        color: isMdDown ? '' : obterCorContraste(parcela.cor)               
                                      }
                                    }}
                                    onClick={() => redirectToUserDetailPage(parcela.idCliente)}
                                  >
                                    <Avatar sx={{ background: parcela.cor, color: obterCorContraste(parcela.cor) }}>
                                      {parcela.cliente[0]}
                                    </Avatar>

                                    <Typography>{parcela.cliente}</Typography>
                                  </Box>
                                </Tooltip>
                              </Box>
                            </Tooltip>

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
      </VariableSizeList>
    </Box>
  );
};

export default Home;
