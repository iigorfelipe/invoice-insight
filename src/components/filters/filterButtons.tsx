import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography as Text,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import Reset from '@mui/icons-material/RotateLeftOutlined';
import { useSettings } from '../../contexts/settings';
import { obterCorContraste } from '../../helpers/randomColor';
import { valorTotalDasParcelas } from '../../helpers/reducer';

const FilterButtons = () => {
  const {
    parcelas,
    corGradiente,
    setDadosDaFiltragemGeral,
    filtroAtivo: filtroAtivoGeral,
    setFiltroAtivo,
    datas,
    dadosDoCliente,
    redefinirFiltro,

    setDadosDaFiltragemPorCliente,
    filtroAtivo2,
    setFiltroAtivo2,
    datas2,
  } = useSettings();

  const filtroAtivo = dadosDoCliente ? filtroAtivo2 : filtroAtivoGeral;

  const parcelasDoCliente = dadosDoCliente?.faturas[0].parcelas;

  const backgroundColor = dadosDoCliente ? dadosDoCliente.cor : corGradiente;

  const [desabilitarFiltragem1, setDesabilitarFiltragem] = useState(true);
  const [desabilitarFiltragem2, setDesabilitarFiltragem2] = useState(true);

  const desabilitarFiltragem = dadosDoCliente
    ? desabilitarFiltragem2
    : desabilitarFiltragem1;

  const aplicarFiltroDePeriodoPersonalizado = () => {
    if (dadosDoCliente) {
      setFiltroAtivo2(1);
      const [ano1, mes1] = datas2.data1.split('-');
      const [ano2, mes2] = datas2.data2.split('-');

      const data1Formatada = `${mes1}/${ano1}`;
      const data2Formatada = `${mes2}/${ano2}`;

      const { parcelas: parcelasDoCliente } = dadosDoCliente?.faturas[0];
      const { valorParcela } = parcelasDoCliente[0];

      const diferencaEmMeses = (data11: string, data22: string): number => {
        const parseDate = (dataStr: string): Date => {
          const [mes, ano] = dataStr.split('/').map(Number);
          return new Date(ano, mes - 1);
        };

        const d1 = parseDate(data11);
        const d2 = parseDate(data22);

        const diferencaEmAno = d2.getFullYear() - d1.getFullYear();
        const diferencaEmMes = d2.getMonth() - d1.getMonth();

        return diferencaEmAno * 12 + diferencaEmMes + 1;
      };

      const periodo = diferencaEmMeses(data1Formatada, data2Formatada);

      const parcelasFiltradas = parcelasDoCliente.filter((parcela) => {
        const [mes, ano] = parcela.data.split('/').map(Number);
        const dataParcela = new Date(ano, mes - 1);
        const dataInicio = new Date(+ano1, +mes1 - 1);
        const dataFim = new Date(+ano2, +mes2 - 1);
        return dataParcela >= dataInicio && dataParcela <= dataFim;
      });

      setDadosDaFiltragemPorCliente({
        total: valorParcela * periodo,
        periodo: `${data1Formatada} a ${data2Formatada}`,
        parcelasFiltradas: parcelasFiltradas,
      });
    } else {
      setFiltroAtivo(1);
      const [ano1, mes1] = datas.data1.split('-');
      const [ano2, mes2] = datas.data2.split('-');

      const data1Formatada = `${mes1}/${ano1}`;
      const data2Formatada = `${mes2}/${ano2}`;

      const parcelasFiltradas = parcelas.filter((parcela) => {
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
    }
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

      const data1Valida =
        datas.data1 >= dataInicial && datas.data1 <= dataFinal;
      const data2Valida =
        datas.data2 >= dataInicial && datas.data2 <= dataFinal;

      const intervaloValido = datas.data1 <= datas.data2;

      if (data1Valida && data2Valida && intervaloValido) {
        setDesabilitarFiltragem(false);
      } else {
        setDesabilitarFiltragem(true);
      }
    };

    validateDates();
  }, [datas.data1, datas.data2]);

  useEffect(() => {
    const validateDates = () => {
      const dataInicial = obterDataInicial();
      const dataFinal = obterDataFinal();

      const data1Valida =
        datas2.data1 >= dataInicial && datas2.data1 <= dataFinal;
      const data2Valida =
        datas2.data2 >= dataInicial && datas2.data2 <= dataFinal;

      const intervaloValido = datas2.data1 <= datas2.data2;

      if (data1Valida && data2Valida && intervaloValido) {
        setDesabilitarFiltragem2(false);
      } else {
        setDesabilitarFiltragem2(true);
      }
    };

    validateDates();
  }, [datas2.data1, datas2.data2]);

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
              background:
                filtroAtivo === 1 ? backgroundColor : 'normal',
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

      {dadosDoCliente && filtroAtivo !== 0 ? (
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
                background:
                  filtroAtivo !== 0 ? backgroundColor : 'normal',
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
                  background:
                    filtroAtivo !== 0 ? backgroundColor : 'normal',
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
