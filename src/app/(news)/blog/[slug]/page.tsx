import { authOptions } from '@/libraries/next-auth'
import ArticleView from '@/views/blog/ArticleView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Blog :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const session = await getServerSession(authOptions)
  const { slug } = params

  return (
    <main>
      <ArticleView session={session!} slug={slug!} />
    </main>
  )
}
