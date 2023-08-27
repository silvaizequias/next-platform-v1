import { Box, Typography } from '@mui/material'
import { TableHeaderProps } from './types'

export default function TableHeader(props: TableHeaderProps) {
  const { title, children } = props

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>{title}</Typography>
      </Box>
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
