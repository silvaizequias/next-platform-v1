import { Metadata } from 'next'
import CategoryListView from '../views/CategoryListView'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Categorias do Blog',
  description: 'Conteúdo inteligente do universo da tecnologia.',
  keywords: [
    'notícias de tecnologia',
    'blog dedicado de tecnologia',
    'blog dedicado',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/blog/categorias`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/blog/categorias`),
    title: 'Categorias do Blog',
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
  return <CategoryListView />
}
