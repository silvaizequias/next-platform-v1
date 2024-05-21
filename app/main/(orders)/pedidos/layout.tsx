import { Metadata } from 'next'
import { Fragment, ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'espaço de pedidos da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrdersLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Fragment>{children}</Fragment>
}