import { authOptions } from '@/libraries/next-auth'
import ArticleView from '@/views/blog/ArticleView'
import { ArticleType } from '@/views/blog/types'
import axios from 'axios'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const res = await axios.get(`${NEXTAUTH_URL}/api/blog/article/${slug}`)
  const article: ArticleType = res.data

  return {
    title: `${article?.subject!} :: Dedicado Digital`,
    description: article?.resume!,
    keywords: [article?.tags!],
    creator: article?.user?.name!,
    publisher: article?.user?.name!,
    openGraph: {
      siteName: 'Dedicado Digital',
      type: 'article',
      title: `${article?.subject!} :: Dedicado Digital`,
      description: article?.resume!,
      authors: [article?.user?.name!],
      publishedTime: new Date(article?.createdAt).toString(),
      images: article?.image! || '/500x500-logotipo5.png',
      locale: 'pt_BR',
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const { slug } = params

  return (
    <main>
      <ArticleView session={session!} slug={slug!} />
    </main>
  )
}
