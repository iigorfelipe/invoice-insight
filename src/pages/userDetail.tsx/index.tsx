import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Typography as Text } from "@mui/material";
import { useSettings } from "../../contexts/settings";
import { useAppTheme } from "../../contexts/theme";
import { Cliente } from "../../types/data";
import PieChartDisplay from "../../components/pieChart";
import UserList from "../../components/userList";
import UserHeader from "../../components/userHeader";

const UserDetails = () => {
  const { idCliente } = useParams();
  const {
    clientes,
    setDadosDoCliente,
    setDadosDaFiltragemCliente
  } = useSettings();
  const { isMdDown } = useAppTheme();

  const cliente = clientes.find((cliente) => cliente.idCliente === idCliente) as Cliente;
  const { parcelas } = cliente.faturas[0];

  useEffect(() => {
    setDadosDaFiltragemCliente({
      total: parcelas[0].valorParcela * parcelas.length,
      periodo: `${parcelas[0].data} a ${parcelas.slice(-1)[0].data}`,
      parcelasFiltradas: parcelas
    });

    setDadosDoCliente(cliente);
  }, [cliente.idCliente]);


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
            
            <UserHeader cliente={cliente} />

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

                <PieChartDisplay />

                <Divider sx={{ width: '80%', m: '20px 0px' }} />

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

                <UserList />

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
