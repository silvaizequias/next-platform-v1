import { Metadata } from 'next'
import PostListView from '../views/PostListView'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Postagens do Blog',
  description: 'Conteúdo inteligente do universo da tecnologia.',
  keywords: [
    'notícias de tecnologia',
    'blog dedicado de tecnologia',
    'blog dedicado',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/blog/postagens`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/blog/postagens`),
    title: 'Postagens do Blog',
    description: 'Conteúdo inteligente do universo da tecnologia.',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function PostListPage() {
  return <PostListView />
}
