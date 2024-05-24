import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FixedSizeList } from 'react-window';
import { Avatar, Box, Button, Divider, IconButton, TextField, Tooltip, Typography as Text } from "@mui/material";
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
import { DadosDaFiltragem } from "../../types/filters";

const UserDetails = () => {
  const { idCliente } = useParams();
  const { clientes } = useSettings();
  const { isSmDown, isMdDown } = useAppTheme();
  const [exibirContatos, setExibirContatos] = useState(false);
  const [desabilitarFiltragem, setDesabilitarFiltragem] = useState(true);
  const [dadosDaFiltragem, setDadosDaFiltragem] = useState<DadosDaFiltragem>({
    total: 0,
    periodo: '',
    parcelasFiltradas: []
  });
  const [datas, setDatas] = useState({
    data1: '',
    data2: '',
  });

  const cliente = clientes.find((cliente) => cliente.idCliente === idCliente) as Cliente;
  const { parcelas } = cliente.faturas[0];

  useEffect(() => {
    setDadosDaFiltragem({
      total: parcelas[0].valorParcela * parcelas.length,
      periodo: `${parcelas[0].data} a ${parcelas.slice(-1)[0].data}`,
      parcelasFiltradas: parcelas
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

    setDadosDaFiltragem({
      total: valorParcela * periodo,
      periodo: `${data1Formatada} a ${data2Formatada}`,
      parcelasFiltradas: parcelas.slice(0, periodo)
    });
  };

  const aplicarFiltroDePeriodoPredefinido = (periodo: number) => {
    const { valorParcela, data } = parcelas[0];

    setDadosDaFiltragem({
      total: valorParcela * periodo,
      periodo: `${data} a ${parcelas[periodo -1].data}`,
      parcelasFiltradas: parcelas.slice(0, periodo)
    });
  };

  const obterDataInicial = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };


  const obterDataFinal = () => {
    const [mes, ano] = parcelas.slice(-1)[0].data.split('/');
    return `${ano}-${mes}`;
  };


  useEffect(() => {
    const validateDates = () => {
      const dataInicial = obterDataInicial();
      const dataFinal = obterDataFinal();
  
      const data1Valida = datas.data1 >= dataInicial && datas.data1 <= dataFinal;
      const data2Valida = datas.data2 >= dataInicial && datas.data2 <= dataFinal;
  
      const intervaloValido = datas.data1 <= datas.data2;
  
      if (data1Valida && data2Valida && intervaloValido) {
        setDesabilitarFiltragem(false);
      } else {
        setDesabilitarFiltragem(true);
      };
    };
  
    validateDates();
  }, [datas.data1, datas.data2, cliente]);
  
  const obterMensagemDesabilitacao = (periodo: number): string => {
    const numeroDeParcelas = parcelas.length;
    if (periodo > numeroDeParcelas) {
      return `${cliente.nome} possui ${numeroDeParcelas} parcela(s). Não é possível filtrar por ${periodo} meses.`;
    };
    return '';
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
                  gap: isSmDown ? '10px' : '20px',
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
                  <Text>{cliente.nome}</Text>
                </Box>

                <Box
                  sx={{
                    display: exibirContatos ? 'flex' : 'none',
                    alignItems: 'center',
                    gap: isSmDown ? '0px' : '20px',
                    flexDirection: isSmDown ? 'column':  'flex'
                  }}
                >
                  <Text>{cliente.contatos.celuar}</Text>
                  {!isSmDown && '|' }
                  <Text>{cliente.contatos.email}</Text>
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
          
                  <Text>{dadosDaFiltragem.periodo}</Text>
                  <Divider sx={{width: '100%', mt: '-15px'}} />
                  <Text>Valor total a receber:</Text>
                  <Text variant='h5' sx={{ fontWeight: 600 }}>{formatarValorParaMoedaBrasileira(dadosDaFiltragem.total)}</Text>

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

                  <Text>Filtre por períodos predefinidos</Text>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '20px'
                    }}
                  >
                   
                    {
                      [3, 6, 9].map((periodo) => {
                        const desabilitado = periodo > parcelas.length
                        const mensagemDesabilitacao = obterMensagemDesabilitacao(periodo);

                        return (
                          <Box
                            key={periodo}
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
                            <Tooltip title={desabilitado ? <Text>{mensagemDesabilitacao}</Text> : ''}>
                              <span>
                                <Button
                                  onClick={() => aplicarFiltroDePeriodoPredefinido(periodo)}
                                  variant='outlined'
                                  disabled={desabilitado}
                                  sx={{
                                    borderRadius: '50%',
                                    width: isMdDown ? '70px' : '100px',
                                    height: isMdDown ? '70px' : '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: cliente.cor,
                                    color: obterCorContraste(cliente.cor),
                                    '&:hover': {
                                      background: 'transparent',
                                    },
                                    '&:disabled': {
                                      background: 'transparent',
                                    },
                                  }}
                                >
                                  <Text variant='h4'>{periodo}</Text>
                                </Button>
                              </span>
                            </Tooltip>
                            <Text>meses</Text>
                          </Box>
                        );
                      })
                    }
                   
                  </Box>

                  <Text>Ou um período personalizado</Text>

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
                      inputProps={{ min: obterDataInicial(), max: obterDataFinal() }}
                      size='small'                      
                      onChange={({ target: { value } }) => setDatas((prev) => { return {...prev, data1: value}} )}
                    /> 
                    
                    <Tooltip
                      title={desabilitarFiltragem ? (
                        <Text>
                          Escolha uma data entre {parcelas[0].data} e {parcelas.slice(-1)[0].data}
                        </Text>
                      ) : ''}
                    >
                      <span>
                        <IconButton
                          disabled={desabilitarFiltragem}
                          onClick={aplicarFiltroDePeriodoPersonalizado}
                          size='small'
                          sx={{
                            borderRadius: '9px',
                            background: cliente.cor,
                            color: obterCorContraste(cliente.cor),
                            '&:disabled': {
                              color: cliente.cor,
                            },
                            '&:hover': {
                              color: cliente.cor,
                            }                           
                          }}
                        >
                          <Search />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <TextField
                      type='month'
                      inputProps={{ min: obterDataInicial(), max: obterDataFinal() }}
                      size='small'
                      onChange={({ target: { value } }) => setDatas((prev) => { return {...prev, data2: value}} )}
                    /> 

                  </Box>

                </Box>

              </Box>

              <Box
                sx={{
                  display:'flex',
                  flexDirection: 'column',
                  width: isMdDown ? '100%' : '50%',
                  alignItems: 'end',
                  gap: '30px',
                }}
              >

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',                 
                    borderRadius: '20px',
                    m: '0px 15px -25px 0px',
                  }}
                >
                  
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'end',
                      gap: '10px',
                    }}
                  >
                    <Text>Total:</Text>
                    <Text sx={{ fontWeight: 600 }}>
                      {formatarValorParaMoedaBrasileira(dadosDaFiltragem.total)}
                    </Text>
                  </Box>

                </Box>

                <FixedSizeList
                  height={500}
                  itemCount={dadosDaFiltragem.parcelasFiltradas.length}
                  itemSize={60}
                  width='100%'
                  itemData={dadosDaFiltragem.parcelasFiltradas}
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
            <Text variant="h5">Cliente não encontrado</Text>
          </Box>
        )
      }
    </Box>
  );
};

export default UserDetails;
