import CrispChat from '@/components/crisp-chat'
import { Metadata } from 'next'
import { ReactNode } from 'react'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const metadata: Metadata = {
  applicationName: 'dedicado',
  generator: 'dedicado',
  category: 'landing page',
  title: {
    default: 'Suporte e Desenvolvimento',
    template: `%s | Dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  icons: './favicon.ico',
  openGraph: {
    title: {
      default: 'Suporte e Desenvolvimento',
      template: `%s | Dedicado`,
    },
    description:
      'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    images: ['/logotipo.png'],
  },
  metadataBase: new URL(`https://${NEXT_PUBLIC_URL}`),
  alternates: {
    canonical: new URL(`https://${NEXT_PUBLIC_URL}`),
  },
}

export default function LandingLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="block">
      {children}
      {!isDevelopment && <CrispChat />}
    </div>
  )
}
