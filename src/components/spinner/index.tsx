import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function Spinner({ sx }: { sx?: BoxProps['sx'] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        ...sx,
      }}
    >
      <Box sx={{ py: '25%' }}>
        <CircularProgress size={60} sx={{ m: 6 }} />
      </Box>
    </Box>
  )
}
