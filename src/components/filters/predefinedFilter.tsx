import { Box, Button, Tooltip, Typography as Text } from "@mui/material";
import { useSettings } from "../../contexts/settings";
import { obterCorContraste } from "../../helpers/randomColor";
import { valorTotalDasParcelas } from "../../helpers/reducer";

const PERIODOS = [3, 6, 9];

const PredefinedFilters = () => {
  const {
    parcelas,
    corGradiente,
    setDadosDaFiltragemGeral,
    filtroAtivo: filtroAtivoGeral,
    setFiltroAtivo,
    dadosDoCliente,

    setDadosDaFiltragemCliente,
    filtroAtivoCliente,
    setFiltroAtivoCliente,
  } = useSettings();

  const filtroAtivo = dadosDoCliente ? filtroAtivoCliente : filtroAtivoGeral

  const parcelasDoCliente = dadosDoCliente?.faturas[0].parcelas;

  const backgroundColor = dadosDoCliente ? dadosDoCliente.cor : corGradiente;

  const aplicarFiltroDePeriodoPredefinido = (periodo: number) => {
    if (dadosDoCliente) {
      setFiltroAtivoCliente(periodo);
      const { parcelas: parcelasDoCliente } = dadosDoCliente?.faturas[0];
      const { valorParcela, data } = parcelasDoCliente[0];

      setDadosDaFiltragemCliente({
        total: valorParcela * periodo,
        periodo: `${data} a ${parcelasDoCliente[periodo -1].data}`,
        parcelasFiltradas: parcelasDoCliente.slice(0, periodo)
      });

    } else {

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
    }
  };

  const obterMensagemDesabilitacao = (periodo: number) => {
    const numeroDeParcelas = dadosDoCliente ? (parcelasDoCliente?.length || 0) : parcelas.length;

    if (periodo > numeroDeParcelas) {
      const str = numeroDeParcelas === 1 ? 'mês' : 'meses';
      return `${numeroDeParcelas} ${str} é o máximo disponível.`;
    };
    return '';
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px'
      }}
    >
      
      {
        PERIODOS.map((periodo) => {        

          const desabilitado = periodo > (dadosDoCliente ? parcelasDoCliente?.length || 0 : parcelas.length)
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
                      background: filtroAtivo === periodo ? backgroundColor : 'normal',
                      color: filtroAtivo === periodo ? obterCorContraste(backgroundColor) : 'normal',
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
  );
};

export default PredefinedFilters;
