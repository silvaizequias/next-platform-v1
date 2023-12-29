import CrispChat from '@/components/crisp-chat'
import { Metadata } from 'next'
import { ReactNode } from 'react'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: `%s | Dedicado`,
  },
  description:
    'Conteúdo inteligente do unierso da tecnologia',
  icons: './favicon.ico',
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
