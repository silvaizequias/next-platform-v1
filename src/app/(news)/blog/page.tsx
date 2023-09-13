import { authOptions } from '@/libraries/next-auth'
import ArticlesView from '@/views/blog/ArticlesView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Blog :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function ArticlesPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <ArticlesView session={session!} metadata={metadata!} />
    </main>
  )
}
