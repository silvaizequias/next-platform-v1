import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: `%s | Dedicado`,
  },
  description:
    'Conteúdo inteligente do universo de tecnologia.',
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div>{children}</div>
}
