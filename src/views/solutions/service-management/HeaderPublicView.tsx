import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { MdAddTask, MdPhonelink, MdPhonelinkRing, MdRoom } from 'react-icons/md'

export default function HeaderPublicView() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        mx: 'auto',
      }}
    >
      <Typography variant='h1'>Gestão de Serviços</Typography>
      <Divider sx={{ m: 4, px: 10, color: grey[50] }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Tooltip title='Painel de Controle'>
            <IconButton
              sx={{
                p: 1,
                color: grey[50],
                '&:hover': { color: blue[400] },
              }}
            >
              <MdPhonelink />
            </IconButton>
          </Tooltip>
          <Tooltip title='Agente de Serviço em Campo'>
            <IconButton
              sx={{
                p: 1,
                color: grey[50],
                '&:hover': { color: blue[400] },
              }}
            >
              <MdPhonelinkRing />
            </IconButton>
          </Tooltip>
          <Tooltip title='Acompanhamento em Tempo Real'>
            <IconButton
              sx={{
                p: 1,
                color: grey[50],
                '&:hover': { color: blue[400] },
              }}
            >
              <MdRoom />
            </IconButton>
          </Tooltip>
          <Tooltip title='Controle de Demandas'>
            <IconButton
              sx={{
                p: 1,
                color: grey[50],
                '&:hover': { color: blue[400] },
              }}
            >
              <MdAddTask />
            </IconButton>
          </Tooltip>
        </Box>
      </Divider>
      <Typography variant='button' textTransform={'uppercase'}>
        Solução inteligente para acompanhamento de demandas em tempo real, que
        aumentam a produtividade de pessoas e organizações
      </Typography>
    </Box>
  )
}
