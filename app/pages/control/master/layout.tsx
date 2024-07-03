import { controlUrl } from '@/helpers'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(controlUrl),
  title: {
    default: 'Controle Máximo da Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function MasterControlLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div>{children}</div>
}
