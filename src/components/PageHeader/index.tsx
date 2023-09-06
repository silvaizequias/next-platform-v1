import { Box, Typography } from '@mui/material'
import { PageHeaderProps } from './types'
import { blue } from '@mui/material/colors'

export default function PageHeader(props: PageHeaderProps) {
  const { children, title } = props

  return (
    <Box
      sx={{
        py: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant='body1'
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', color: blue[800] }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
