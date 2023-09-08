import { LayoutProps } from '@/types'
import { Fragment } from 'react'

export default async function SubdomainLayout(props: LayoutProps) {
  const { children } = props

  return <Fragment>{children}</Fragment>
}
