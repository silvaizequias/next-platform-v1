import { LayoutProps } from '@/types'
import { Fragment } from 'react'

export default function ManagerLayout(props: LayoutProps) {
  const { children } = props

  return <Fragment>{children}</Fragment>
}
