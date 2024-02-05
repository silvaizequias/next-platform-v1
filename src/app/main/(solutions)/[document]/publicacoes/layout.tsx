import { Metadata } from 'next'
import { ReactNode, Fragment } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'gestão de publicações da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationPublicationsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Fragment>{children}</Fragment>
}
