import { Box, Container, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

interface HeadLookProps {
  title: string
  subtitle: string
}
export default function HeadLook(props: HeadLookProps) {
  const { title, subtitle } = props

  return (
    <Box sx={{ bgcolor: blue[800] }}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginY: '25%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: 'whitesmoke', textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: blue[200], textTransform: 'uppercase' }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
