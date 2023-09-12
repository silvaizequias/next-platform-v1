import { Box, Typography } from '@mui/material'
import { PageHeaderProps } from './types'
import { blue } from '@mui/material/colors'

export default function PageHeader(props: PageHeaderProps) {
  const { children, metadata } = props
  const { title }: any = metadata

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
        variant='h6'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          textTransform: 'uppercase',
          fontWeight: '200',
          color: blue[600],
        }}
      >
        {title!}
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
