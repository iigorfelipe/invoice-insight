import { useEffect, useState } from "react";
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
import { Cliente } from "../../types/data";
import { Search } from "@mui/icons-material";

const UserDetails = () => {
  const { idCliente } = useParams();
  const { clientes } = useSettings();
  const { isSmDown, isMdDown } = useAppTheme();
  const [exibirContatos, setExibirContatos] = useState(false);
  const [valorDoFiltro, setValorDoFiltro] = useState({
    total: 0,
    periodo: '',
  });
  const [datas, setDatas] = useState({
    data1: '',
    data2: '',
  })

  const cliente = clientes.find((cliente) => cliente.idCliente === idCliente) as Cliente;
  const { parcelas } = cliente.faturas[0];

  useEffect(() => {
    setValorDoFiltro({
      total: cliente.faturas[0].valor_fatura,
      periodo: `${parcelas[0].data} a ${parcelas[parcelas.length -1].data}`
    });
  }, [cliente.idCliente]);


  const diferencaEmMeses = (data1: string, data2: string): number => {

    const parseDate = (dataStr: string): Date => {
      const [mes, ano] = dataStr.split('/').map(Number);
      return new Date(ano, mes - 1);
    };

    const d1 = parseDate(data1);
    const d2 = parseDate(data2);

    const diferencaEmAno = d2.getFullYear() - d1.getFullYear();
    const diferencaEmMes = d2.getMonth() - d1.getMonth();

    return diferencaEmAno * 12 + diferencaEmMes + 1;
  };


  const aplicarFiltroDePeriodoPersonalizado = () => {
    const [ano1, mes1] = datas.data1.split('-');
    const [ano2, mes2] = datas.data2.split('-');

    const data1Formatada = `${mes1}/${ano1}`;
    const data2Formatada = `${mes2}/${ano2}`;

    const { valorParcela } = parcelas[0];

    const periodo = diferencaEmMeses(data1Formatada, data2Formatada);

    setValorDoFiltro({
      total: valorParcela * periodo,
      periodo: `${data1Formatada} a ${data2Formatada}`
    });
  };

  const aplicarFiltroDePeriodoPredefinido = (periodo: number) => {
    const { valorParcela, data } = parcelas[0];

    setValorDoFiltro({
      total: valorParcela * periodo,
      periodo: `${data} a ${parcelas[periodo -1].data}`
    });
  };

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
                    flexDirection: isSmDown ? 'column':  'flex'
                  }}
                >
                  <Typography>{cliente.contatos.celuar}</Typography>
                  {!isSmDown && '|' }
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
          
                  <Typography>{valorDoFiltro.periodo}</Typography>
                  <Divider sx={{width: '100%', mt: '-15px'}} />
                  <Typography>Valor total a receber:</Typography>
                  <Typography variant='h5'>{formatarValorParaMoedaBrasileira(valorDoFiltro.total)}</Typography>
                  
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
                        onClick={() => aplicarFiltroDePeriodoPredefinido(3)}
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
                        onClick={() => aplicarFiltroDePeriodoPredefinido(6)}
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
                        onClick={() => aplicarFiltroDePeriodoPredefinido(9)}
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
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <TextField
                      type='month'
                      size='small'                      
                      onChange={({ target: { value } }) => setDatas((prev) => { return {...prev, data1: value}} )}
                    /> 
                      a
                    <TextField
                      type='month'
                      size='small'
                      onChange={({ target: { value } }) => setDatas((prev) => { return {...prev, data2: value}} )}
                    /> 

                    <IconButton
                      sx={{
                        width:  '40px',
                        heigth: '40px',
                        borderRadius: '9px',                        
                      }}
                      onClick={aplicarFiltroDePeriodoPersonalizado}
                    >
                      <Search />
                    </IconButton>
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
                  itemCount={parcelas.length}
                  itemSize={60}
                  width='100%'
                  itemData={parcelas}
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
