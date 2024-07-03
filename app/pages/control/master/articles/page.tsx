import { Metadata } from 'next'
import ArticleList from './views/ArticleList'

export const metadata: Metadata = {
  alternates: {
    canonical: 'master/articles',
  },
  title: {
    default: 'Controle de Artigos da Plataforma',
    template: `%s | Dedicado`,
  },
}

export default function ArticleControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ArticleList />
    </div>
  )
}
