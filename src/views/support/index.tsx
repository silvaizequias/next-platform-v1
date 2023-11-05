import {
  CloudSync,
  Handyman,
  HeadsetMic,
  MiscellaneousServices,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export default function SupportView() {
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
            Suporte Dedicado
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: blue[200], fontSize: { xs: 14, sm: 18 } }}
          >
            Apoio técnico especializado com atendimento personalizado
          </Typography>
          <Divider sx={{ borderColor: 'white', m: 2 }}>
            <Tooltip title={'Apoio Personalizado'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 2 }}
              >
                <HeadsetMic />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Migração de Dados'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
              >
                <CloudSync />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Configurações e Implementações'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
              >
                <MiscellaneousServices />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Correção de Falhas'}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
              >
                <Handyman />
              </IconButton>
            </Tooltip>
          </Divider>
        </Box>
      </Box>
    </Box>
  )
}
