import { Box } from '@mui/material'
import { DefaultLayoutProps } from './types'

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props

  return <Box>{children}</Box>
}
