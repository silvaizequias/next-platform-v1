import { Box, Button, Divider, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export default function ServiceManagementView() {
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
            Gestão de Serviços
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: blue[200], fontSize: { xs: 14, sm: 18 } }}
          >
            Acompanhamento das demandas de serviço em tempo real
          </Typography>
          <Divider sx={{ borderColor: 'white', m: 2 }}>
            <Button variant="contained" size="small" sx={{ mx: 1 }}>
              Solicite um orçamento através do chat
            </Button>
          </Divider>
        </Box>
      </Box>
    </Box>
  )
}
