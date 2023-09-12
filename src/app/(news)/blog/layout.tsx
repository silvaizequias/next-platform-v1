import { LayoutProps } from '@/types'
import { Container } from '@mui/material'
import { Fragment } from 'react'

export default async function BlogLayout(props: LayoutProps) {
  const { children } = props

  return (
    <Fragment>
      <Container maxWidth='xl'>{children}</Container>
    </Fragment>
  )
}
