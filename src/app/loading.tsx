import { Box, CircularProgress, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export default function Loading() {
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
            textAlign: 'center'
          }}
        >
          <CircularProgress size={60} sx={{ m: 4 }} />
          <Typography variant='h6'>aguarde</Typography>
        </Box>
      </Box>
    </Box>
  )
}
