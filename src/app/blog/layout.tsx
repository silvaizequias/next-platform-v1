import CrispChat from '@/components/crisp-chat'
import { Metadata } from 'next'
import { ReactNode } from 'react'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const metadata: Metadata = {
  applicationName: 'dedicado',
  generator: 'dedicado',
  category: 'blog',
  title: {
    default: 'Blog',
    template: `%s | Dedicado`,
  },
  description:
    'Conteúdo inteligente do universo da tecnologia',
  icons: './favicon.ico',
  keywords: [
    'software de serviços em nuvem',
    'software saas',
    'tecnologia da informação',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
  ],
  openGraph: {
    title: {
    default: 'Blog',
    template: `%s | Dedicado`,
  },
    description:
      'Conteúdo inteligente do unierso da tecnologia',
    images: ['/logotipo.png'],
  },
  metadataBase: new URL('https://blog.' + NEXT_PUBLIC_URL),
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="block">
      {children}
      {!isDevelopment && <CrispChat />}
    </div>
  )
}
