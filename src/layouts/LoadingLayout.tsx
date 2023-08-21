import { Box } from '@mui/material'
import { LoadingLayoutProps } from './types'

export default function LoadingLayout(props: LoadingLayoutProps) {
  const { sx, children } = props

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
