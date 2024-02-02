import { Metadata } from 'next'
import { ReactNode, Fragment } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'gestão de pedidos da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationOrdersLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Fragment>{children}</Fragment>
}
