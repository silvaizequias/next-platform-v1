import { articleUrl } from '@/helpers'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(articleUrl),
  title: {
    default: 'Artigos',
    template: `%s | Dedicado`,
  },
  description: 'Conteúdo inteligente do universo de tecnologia.',
}

export default function ArticleLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div>{children}</div>
}
