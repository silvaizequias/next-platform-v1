import { BoxProps } from '@mui/material'
import { ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

export interface LoadingLayoutProps {
  sx?: BoxProps['sx']
  children: ReactNode
}
