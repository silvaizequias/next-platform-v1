import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Conteúdo Inteligente',
    template: `%s | Dedicado`,
  },
  description: 'Conteúdo inteligente do universo de tecnologia.',
}

export default function ArticlePage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      artigos
    </div>
  )
}
