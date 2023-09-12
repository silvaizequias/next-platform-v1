import { authOptions } from '@/libraries/next-auth'
import PostView from '@/views/blog/PostView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Blog :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const session = await getServerSession(authOptions)
  const { slug } = params

  return (
    <main>
      <PostView session={session!} slug={slug!} />
    </main>
  )
}
