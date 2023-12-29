import { authOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const metadata: Metadata = {
  applicationName: 'dedicado',
  generator: 'dedicado',
  category: 'management',
  title: {
    default: 'Gestão do Sistema',
    template: `%s | Dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  icons: './favicon.ico',
  openGraph: {
    title: {
    default: 'Gestão do Sistema',
    template: `%s | Dedicado`,
  },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: ['/logotipo.png'],
  },
  metadataBase: new URL('https://sistema.' + NEXT_PUBLIC_URL),
}

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  
  return session ? <div>{children}</div> : redirect('/auth')
}
