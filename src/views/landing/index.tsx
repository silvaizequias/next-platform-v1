'use client'

import { Devices, LiveHelp, TaskAlt, Terminal } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { useRouter } from 'next/navigation'

export default function LandingView() {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <Box sx={{ minWidth: '100%', bgcolor: blue[600], color: 'white' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textTransform: 'uppercase',
            textAlign: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: 'white', fontSize: { xs: 76, sm: 96 } }}
          >
            Dedicado
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: blue[200], fontSize: { xs: 14, sm: 18 } }}
          >
            Soluções criativas para atender as necessidades do seu negócio
          </Typography>
          <Divider sx={{ borderColor: 'white', m: 2 }}>
            <Tooltip title={'Soluções Multiplataforma'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 2 }}
              >
                <Devices />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Gestão de Serviços'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
                onClick={() => handleClick('/gestao-de-servicos')}
              >
                <TaskAlt />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Desenvolvimento de Softwares'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
              >
                <Terminal />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Suporte Personalizado'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
                onClick={() => handleClick('/suporte-dedicado')}
              >
                <LiveHelp />
              </IconButton>
            </Tooltip>
          </Divider>
          <Button variant="contained" size="medium" sx={{ mx: 2 }}>
            Solicite um orçamento através do chat
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
