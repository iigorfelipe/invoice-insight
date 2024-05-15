import { useState } from "react";
import { useParams } from "react-router-dom";
import { FixedSizeList } from 'react-window';
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useSettings } from "../../contexts/settings";
import { obterCorContraste } from "../../helpers/randomColor";
import { formatarValorParaMoedaBrasileira } from "../../helpers/formatCurrent";
 

const UserDetails = () => {
  const { idCliente } = useParams();
  const { clientes } = useSettings();

  const [clicou, setCLicou] = useState(false);

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
                  p: '6px 10px',
                  border: `1px solid ${cliente.cor}`,
                  borderRadius: '25px',
                  width: clicou ? '35%' : '10%',
                  justifyContent: 'space-between',
                  mb: '20px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Avatar sx={{ background: cliente.cor, color: obterCorContraste(cliente.cor) }}>
                    {cliente.nome[0]}
                  </Avatar>
                  <Typography>{cliente.nome}</Typography>
                </Box>

                <Box
                  sx={{
                    display: clicou ? 'flex' : 'none',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <Typography>{cliente.contatos.celuar}</Typography>
                  |
                  <Typography>{cliente.contatos.email}</Typography>
                </Box>

                <IconButton onClick={() => setCLicou(!clicou)}>
                  {clicou ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                </IconButton>

              </Box>
            </Box>

            <Box sx={{ display: 'flex', p: '20px', justifyContent: 'space-around', gap:'50px' }}>

              <Box sx={{height:'400px',  width: '50%', border: '1px solid red'}}></Box>

              <Box
                sx={{
                  display:'flex',
                  flexDirection: 'column',
                  width: '50%',
                  alignItems: 'center',
                  gap: '30px'
                }}
              >

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid gray',
                    width: '40%',
                    borderRadius: '20px',
                    p: '20px'
                  }}
                >
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    console.log({item})
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
