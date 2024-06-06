import { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography as Text } from '@mui/material';
import { Search } from '@mui/icons-material';
import Reset from '@mui/icons-material/RotateLeftOutlined';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';
import { valorTotalDasParcelas } from '../../helpers/reducer';
import { obterDataFinal, obterDataInicial } from '../../helpers/getDatePeriod';
import { diferencaEmMeses } from '../../helpers/differenceInMonths';
import { DatasType } from '../../types/filters';
import { Parcela, ParcelasPorMesAno } from '../../types/data';

const FilterButtons = () => {
  const {
    parcelas: parcelasGeral,
    corGradiente,
    setDadosDaFiltragemGeral,
    filtroAtivo: filtroAtivoGeral,
    setFiltroAtivo,
    datas,
    dadosDoCliente,
    redefinirFiltro,
    setDadosDaFiltragemCliente,
    filtroAtivoCliente,
    setFiltroAtivoCliente,
    datasCliente,
  } = useSettings();

  const [desabilitarFiltragemDe, setDesabilitarFiltragemDe] = useState({
    geral: true,
    cliente: true,
  });

  const filtroAtivo = dadosDoCliente ? filtroAtivoCliente : filtroAtivoGeral;
  const backgroundColor = dadosDoCliente ? dadosDoCliente.cor : corGradiente;
  const parcelasDoCliente = dadosDoCliente?.faturas[0].parcelas;
  const parcelas = dadosDoCliente ? dadosDoCliente?.faturas[0].parcelas : parcelasGeral;

  useEffect(() => {
    const validateDates = () => {
      const dataInicial = obterDataInicial();
      const dataFinal = obterDataFinal(parcelas);
  
      const validate = ({ data1, data2 }: DatasType) => {
        const data1Valida = data1 >= dataInicial && data1 <= dataFinal;
        const data2Valida = data2 >= dataInicial && data2 <= dataFinal;
        const intervaloValido = data1 <= data2;
  
        return data1Valida && data2Valida && intervaloValido;
      };
  
      setDesabilitarFiltragemDe({
        geral: !validate(datas),
        cliente: !validate(datasCliente),
      });
    };
  
    validateDates();
  }, [datas.data1, datas.data2, datasCliente.data1, datasCliente.data2]);


  const desabilitarFiltragem = dadosDoCliente
    ? desabilitarFiltragemDe.cliente
    : desabilitarFiltragemDe.geral;

  const useFilters = () => {
    const datasAtuais = dadosDoCliente ? datasCliente : datas;
    const parcelasAtuais = dadosDoCliente ? (parcelasDoCliente || []) : parcelas;

    const [ano1, mes1] = datasAtuais.data1.split('-');
    const [ano2, mes2] = datasAtuais.data2.split('-');

    const data1 = `${mes1}/${ano1}`;
    const data2 = `${mes2}/${ano2}`;

    const parcelasFiltradas = parcelasAtuais.filter((parcela) => {
      const [mes, ano] = parcela.data.split('/').map(Number);
      const dataParcela = new Date(ano, mes - 1);
      const dataInicio = new Date(+ano1, +mes1 - 1);
      const dataFim = new Date(+ano2, +mes2 - 1);
      return dataParcela >= dataInicio && dataParcela <= dataFim;
    });

    return { data1, data2, parcelasFiltradas }
  };

  const aplicarFiltroDePeriodoPersonalizado = () => {

    const { data1, data2, parcelasFiltradas } = useFilters();

    if (dadosDoCliente) {
      setFiltroAtivoCliente(1);

      const { parcelas: parcelasDoCliente } = dadosDoCliente?.faturas[0];
      const { valorParcela } = parcelasDoCliente[0];

      const periodo = diferencaEmMeses(data1, data2);

      setDadosDaFiltragemCliente({
        total: valorParcela * periodo,
        periodo: `${data1} a ${data2}`,
        parcelasFiltradas: parcelasFiltradas as  Parcela[],
      });
    } else {
      setFiltroAtivo(1);

      const valorTotalFiltrado = valorTotalDasParcelas(parcelasFiltradas as ParcelasPorMesAno[]);

      setDadosDaFiltragemGeral({
        total: valorTotalFiltrado,
        periodo: `${data1} a ${data2}`,
        parcelasFiltradas: parcelasFiltradas as ParcelasPorMesAno[],
      });
    };
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Tooltip
        title={
          desabilitarFiltragem ? (
            <Text>
              Escolha uma data entre{' '}
              {dadosDoCliente && parcelasDoCliente
                ? parcelasDoCliente[0].data
                : parcelas[0].data}{' '}
              e{' '}
              {dadosDoCliente && parcelasDoCliente
                ? parcelasDoCliente.slice(-1)[0].data
                : parcelas.slice(-1)[0].data}
            </Text>
          ) : (
            ''
          )
        }
      >
        <span>
          <IconButton
            disabled={desabilitarFiltragem}
            onClick={aplicarFiltroDePeriodoPersonalizado}
            size="small"
            sx={{
              borderRadius: '9px',
              background: filtroAtivo === 1 ? backgroundColor : 'normal',
              height: '38px',
              width: '38px',
              p: '0px',
              m: '0px',
              color:
                filtroAtivo === 1
                  ? obterCorContraste(backgroundColor)
                  : 'normal',
              border:
                desabilitarFiltragem || filtroAtivo === 1
                  ? 'none'
                  : '1px solid gray',
              '&:disabled': {
                color: backgroundColor,
                background: 'transparent',
              },
            }}
          >
            <Search />
          </IconButton>
        </span>
      </Tooltip>

      {filtroAtivo !== 0 ? (
        <Tooltip title={<Text>Limpar todos os filtros</Text>}>
          <span>
            <IconButton
              disabled={false}
              onClick={redefinirFiltro}
              size="small"
              sx={{
                borderRadius: '9px',
                height: '38px',
                width: '38px',
                p: '0px',
                m: '0px',
                color:
                  filtroAtivo !== 0
                    ? obterCorContraste(backgroundColor)
                    : 'normal',
                background: filtroAtivo !== 0 ? backgroundColor : 'normal',
                border:
                  desabilitarFiltragem || filtroAtivo !== 0
                    ? 'none'
                    : '1px solid gray',
                '&:disabled': {
                  color: backgroundColor,
                  background: 'transparent',
                },
                '&:hover': {
                  color:
                    filtroAtivo !== 0
                      ? obterCorContraste(backgroundColor)
                      : 'normal',
                  background: filtroAtivo !== 0 ? backgroundColor : 'normal',
                },
              }}
            >
              <Reset />
            </IconButton>
          </span>
        </Tooltip>
      ) : null}
    </Box>
  );
};

export default FilterButtons;
