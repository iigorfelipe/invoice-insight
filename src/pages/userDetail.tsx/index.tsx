import { useState } from "react";
import { useParams } from "react-router-dom";
import { FixedSizeList } from 'react-window';
import { Avatar, Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import ArrowRight from '@mui/icons-material/NavigateNext';
import ArrowLeft from '@mui/icons-material/NavigateBefore';
import ArrowDown from '@mui/icons-material/KeyboardArrowDownOutlined';
import ArrowUp from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useSettings } from "../../contexts/settings";
import { obterCorContraste } from "../../helpers/randomColor";
import { formatarValorParaMoedaBrasileira } from "../../helpers/formatCurrent";
import { useAppTheme } from "../../contexts/theme";
 

const UserDetails = () => {
  const { idCliente } = useParams();
  const { clientes } = useSettings();
  const { isSmDown, isMdDown } = useAppTheme();
  const [exibirContatos, setExibirContatos] = useState(false);

  const cliente = clientes.find(cliente => cliente.idCliente === idCliente);


  return (
    <Box
      sx={{
        p: '0px 10%',
        display: "flex",
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {
        cliente ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Box
                sx={{
                  display: "flex",
                  p: '6px',
                  border: `1px solid ${cliente.cor}`,
                  borderRadius: '25px',
                  minWidth: '150px',
                  justifyContent: 'space-between',
                  mb: '20px',
                  gap: '20px',
                  flexDirection: exibirContatos ? (isSmDown ? 'column' : 'flex') : 'flex'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: exibirContatos ? '8px' : '20px',
                    justifyContent:   'center'
                  }}
                >
                  <Avatar sx={{ background: cliente.cor, color: obterCorContraste(cliente.cor) }}>
                    {cliente.nome[0]}
                  </Avatar>
                  <Typography>{cliente.nome}</Typography>
                </Box>

                <Box
                  sx={{
                    display: exibirContatos ? 'flex' : 'none',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <Typography>{cliente.contatos.celuar}</Typography>
                  |
                  <Typography>{cliente.contatos.email}</Typography>
                </Box>

                <IconButton onClick={() => setExibirContatos(!exibirContatos)} sx={{ borderRadius:'20px',}}>
                  {
                    exibirContatos
                    ? (isSmDown ? <ArrowUp /> : <ArrowLeft />)
                    : (isSmDown ? <ArrowDown /> : <ArrowRight />)
                  }
                </IconButton>

              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: isMdDown ? 'column' : 'flex',
                p: '20px',
                gap: '50px',
                alignItems: 'center',
              }}
            >

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: isMdDown ? '100%' : '50%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexDirection: 'column',
                    border: '1px solid gray',
                    borderRadius: '20px',
                    p: '20px 60px'
                  }}
                >
          
                  <Typography>14/05/2024 a 14/09/2024</Typography>
                  <Divider sx={{width: '100%', mt: '-15px'}} />
                  <Typography>Valor total a receber:</Typography>
                  <Typography variant='h6'>R$ 500,00</Typography>
                  
                </Box>

                <Divider sx={{ width: '80%', m: '20px 0px' }} />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >

                  <Typography>Filtre por períodos predefinidos</Typography>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '20px'
                    }}
                  >
                    <Box
                      sx={{
                        border:'1px solid gray',
                        borderRadius: '20px',
                        p: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Button
                        variant='outlined'                        
                        sx={{
                          borderRadius: '50%',
                          width: isMdDown ? '70px' : '100px',
                          height: isMdDown ? '70px' : '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:'center',
                          background: 'transparent',
                          '&:hover': {
                            background: cliente.cor,
                            color: obterCorContraste(cliente.cor),
                            borderColor: cliente.cor
                          }
                        }}
                      >
                        <Typography variant='h4'>3</Typography>
                      </Button>
                      <Typography>meses</Typography>
                    </Box>
                    <Box
                      sx={{
                        border:'1px solid gray',
                        borderRadius: '20px',
                        p: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Button
                        variant='outlined'                        
                        sx={{
                          borderRadius: '50%',
                          width: isMdDown ? '70px' : '100px',
                          height: isMdDown ? '70px' : '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:'center',
                          background: 'transparent',
                          '&:hover': {
                            background: cliente.cor,
                            color: obterCorContraste(cliente.cor),
                            borderColor: cliente.cor
                          }
                        }}
                      >
                        <Typography variant='h4'>6</Typography>
                      </Button>
                      <Typography>meses</Typography>
                    </Box>
                    <Box
                      sx={{
                        border:'1px solid gray',
                        borderRadius: '20px',
                        p: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Button
                        variant='outlined'                        
                        sx={{
                          borderRadius: '50%',
                          width: isMdDown ? '70px' : '100px',
                          height: isMdDown ? '70px' : '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:'center',
                          background: 'transparent',
                          '&:hover': {
                            background: cliente.cor,
                            color: obterCorContraste(cliente.cor),
                            borderColor: cliente.cor
                          }
                        }}
                      >
                        <Typography variant='h4'>9</Typography>
                      </Button>
                      <Typography>meses</Typography>
                    </Box>
                  </Box>

                  <Typography>Ou escolha um período personalizado</Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px'
                    }}
                  >
                    <TextField type='date' size='small' />
                    a
                    <TextField type='date' size='small' />
                  </Box>

                </Box>

              </Box>

              <Box
                sx={{
                  display:'flex',
                  flexDirection: 'column',
                  width: isMdDown ? '100%' : '50%',
                  alignItems: 'center',
                  gap: '30px',
                }}
              >

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',                 
                    borderRadius: '20px',
                    p: '20px',
                    mb: '-45px'
                  }}
                >
                  
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography>Total:</Typography>
                    <Typography>{formatarValorParaMoedaBrasileira(cliente.faturas[0].valor_fatura)}</Typography>
                  </Box>

                </Box>

                <FixedSizeList
                  height={500}
                  itemCount={cliente.faturas[0].parcelas.length}
                  itemSize={60}
                  width='100%'
                  itemData={cliente.faturas[0].parcelas}
                >
                  {({ index, style, data }) => {
                    const item = data[index];
                    return (
                      <Box
                        style={style}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderTop: '1px solid gray',
                          alignItems: 'center',
                          p: '0px 20px'
                        }}
                      >
                        <Box>{item.data}</Box>
                        <Box>{item.parcela}</Box>
                        <Box>{formatarValorParaMoedaBrasileira(item.valorParcela)}</Box>
                      </Box>
                    )
                  }}
                </FixedSizeList>

              </Box>

            </Box>
            
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h5">Cliente não encontrado</Typography>
          </Box>
        )
      }
    </Box>
  );
};

export default UserDetails;
