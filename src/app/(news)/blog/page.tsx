import { authOptions } from '@/libraries/next-auth'
import PostsView from '@/views/blog/PostsView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Blog :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function PostsPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <PostsView session={session!} metadata={metadata!} />
    </main>
  )
}
