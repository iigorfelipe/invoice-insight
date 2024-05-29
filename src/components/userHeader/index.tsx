import { useState } from 'react';
import { Avatar, Box, IconButton, Typography as Text } from "@mui/material";
import ArrowRight from '@mui/icons-material/NavigateNext';
import ArrowLeft from '@mui/icons-material/NavigateBefore';
import ArrowDown from '@mui/icons-material/KeyboardArrowDownOutlined';
import ArrowUp from '@mui/icons-material/KeyboardArrowUpOutlined';
import { obterCorContraste } from '../../helpers/randomColor';
import { useAppTheme } from '../../contexts/theme';
import { Cliente } from '../../types/data';

type UserHeaderProps = {
  cliente: Cliente;
};

const UserHeader = ({ cliente }: UserHeaderProps) => {
  const { isSmDown } = useAppTheme();
  const [exibirContatos, setExibirContatos] = useState(false);

  return (

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
  );
};

export default UserHeader;
