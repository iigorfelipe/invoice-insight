import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FixedSizeList } from 'react-window';
import { Box } from "@mui/material";

import { useSettings } from "../../contexts/settings";
import { formatarValorParaMoedaBrasileira } from "../../helpers/formatCurrent";
import { Cliente } from "../../types/data";

const UserList = () => {
  const { idCliente } = useParams();
  const {
    clientes,
    setDadosDoCliente,
    dadosDaFiltragemPorCliente,
    setDadosDaFiltragemPorCliente
  } = useSettings();

  const cliente = clientes.find((cliente) => cliente.idCliente === idCliente) as Cliente;
  const { parcelas } = cliente.faturas[0];

  useEffect(() => {
    setDadosDaFiltragemPorCliente({
      total: parcelas[0].valorParcela * parcelas.length,
      periodo: `${parcelas[0].data} a ${parcelas.slice(-1)[0].data}`,
      parcelasFiltradas: parcelas
    });

    setDadosDoCliente(cliente);
  }, [cliente.idCliente]);


  return (
    <FixedSizeList
      height={500}
      itemCount={dadosDaFiltragemPorCliente.parcelasFiltradas.length}
      itemSize={60}
      width='100%'
      itemData={dadosDaFiltragemPorCliente.parcelasFiltradas}
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
  );
};

export default UserList;
