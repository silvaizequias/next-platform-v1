import { Metadata } from 'next'
import { Fragment, ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Você Está no Blog da Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function BlogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Fragment>{children}</Fragment>
}
