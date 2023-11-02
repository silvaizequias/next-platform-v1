import { Box, Container, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

interface HeadLookProps {
  title: string
  subtitle: string
}
export default function HeadLook(props: HeadLookProps) {
  const { title, subtitle } = props

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: blue[600],
      }}
    >
      <Box
        sx={{
          paddingY: 25,
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: 'white', fontSize: { xs: 76, sm: 96 } }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: blue[200], fontSize: { xs: 14, sm: 18 } }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  )
}
