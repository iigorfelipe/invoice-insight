import { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField, Tooltip, Typography as Text } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppTheme } from "../../contexts/theme";
import { useSettings } from "../../contexts/settings";
import { obterCorContraste } from "../../helpers/randomColor";
import { valorTotalDasParcelas } from "../../helpers/reducer";

const Filters = () => {
  const {
    parcelas,
    corGradiente,
    setDadosDaFiltragemGeral,
    filtroAtivo,
    setFiltroAtivo,
    datas,
    setDatas
  } = useSettings();
  const { isSmDown } = useAppTheme();

  const [desabilitarFiltragem, setDesabilitarFiltragem] = useState(true);


  const aplicarFiltroDePeriodoPersonalizado = () => {
    setFiltroAtivo(1);
    const [ano1, mes1] = datas.data1.split('-');
    const [ano2, mes2] = datas.data2.split('-');

    const data1Formatada = `${mes1}/${ano1}`;
    const data2Formatada = `${mes2}/${ano2}`;

    const parcelasFiltradas = parcelas.filter(parcela => {
      const [mes, ano] = parcela.data.split('/').map(Number);
      const dataParcela = new Date(ano, mes - 1);
      const dataInicio = new Date(+ano1, +mes1 - 1);
      const dataFim = new Date(+ano2, +mes2 - 1);
      return dataParcela >= dataInicio && dataParcela <= dataFim;
    });

    const valorTotalFiltrado = valorTotalDasParcelas(parcelasFiltradas);

    setDadosDaFiltragemGeral({
      total: valorTotalFiltrado,
      periodo: `${data1Formatada} a ${data2Formatada}`,
      parcelasFiltradas: parcelasFiltradas,
    });
  };

  const aplicarFiltroDePeriodoPredefinido = (periodo: number) => {
    setFiltroAtivo(periodo);
    const dataInicial = parcelas[0].data;
    const dataFinal = parcelas[periodo - 1].data;

    const valorTotalFiltrado = valorTotalDasParcelas(parcelas);

    const parcelasFiltradas = parcelas.slice(0, periodo);

    setDadosDaFiltragemGeral({
      total: valorTotalFiltrado,
      periodo: `${dataInicial} a ${dataFinal}`,
      parcelasFiltradas: parcelasFiltradas,
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
      }
    };

    validateDates();
  }, [datas.data1, datas.data2]);

  const obterMensagemDesabilitacao = (periodo: number) => {
    const numeroDeParcelas = parcelas.length;
    if (periodo > numeroDeParcelas) {
      return `${numeroDeParcelas} parcela(s) disponíveis. Não é possível filtrar por ${periodo} meses.`;
    }
    return '';
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: 'column',
        gap: '40px',
        // border: '1px solid red'
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
                            width:'60px',
                            height:'60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: filtroAtivo === periodo ? corGradiente : 'normal',
                            color: filtroAtivo === periodo ? obterCorContraste(corGradiente) : 'normal',
                            '&:disabled': {
                              background: 'transparent',
                            }
                          }}
                        >
                          <Text variant='h5'>{periodo}</Text>
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
              flexDirection: isSmDown ? 'column' : 'row',
              justifyContent: 'center',
              gap: isSmDown ? '5px' : '10px',
            }}
          >
            <TextField
              type='month'
              inputProps={{ min: obterDataInicial(), max: obterDataFinal() }}
              size='small'                      
              onChange={({ target: { value } }) => setDatas((prev) => { return {...prev, data1: value}} )}
              value={datas.data1}
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
                    background: filtroAtivo === 1 ? corGradiente : 'normal',
                    height: '38px',
                    width: '38px',
                    p: '0px',
                    m: '0px',
                    color: filtroAtivo === 1 ? obterCorContraste(corGradiente) : 'normal',
                    border: (desabilitarFiltragem || filtroAtivo === 1) ? 'none' : '1px solid gray',
                    '&:disabled': {
                      color: corGradiente,
                      background: 'transparent'
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
              onChange={({ target: { value } }) => setDatas((prev) => { return { ...prev, data2: value }} )}
              value={datas.data2}
            />

          </Box>

        </Box>

      </Box>
       
    </Box>
  );
};

export default Filters;
