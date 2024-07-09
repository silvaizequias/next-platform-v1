import { Metadata } from 'next'
import ArticleDetail from '../views/ArticleDetail'
import { actionFindBySlugArticle } from '@/app/core/actions/articles.action'
import { Article } from '@prisma/client'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const { slug } = params

  const article: Article = await actionFindBySlugArticle(slug).then(
    (data) => data?.response,
  )

  return {
    alternates: {
      canonical: article?.slug,
    },
    title: {
      default: article?.title ?? '',
      template: `%s | dedicado`,
    },
    description: 'Conteúdo inteligente do universo de tecnologia.',
  }
}

export default function ArticleDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ArticleDetail slug={slug} />
    </div>
  )
}
