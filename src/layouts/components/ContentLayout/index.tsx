import { LayoutProps } from '@/types'
import { Box } from '@mui/material'

export default function ContentLayout(props: LayoutProps) {
  const { children } = props
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  )
}
