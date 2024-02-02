import { Metadata } from 'next'
import { Fragment, ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'conteúdo inteligente',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Fragment>{children}</Fragment>
}
