import PostDetailScreen from './screen'
import NotFound from '@/app/not-found'
import { Metadata } from 'next'
import BlogHeader from '@/components/blog-header'
import { actionGetPostByParams } from './actions'
import { PostType } from '../types'

export async function generateMetadata({
  params,
}: {
  params: { post: string }
}): Promise<Metadata | null> {
  const post: PostType | any = await actionGetPostByParams(params?.post)

  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

  return post
    ? {
        title: post?.title,
        description: post?.resume,
        authors: { name: post?.author },
        keywords: [post?.keywords],
        openGraph: {
          title: post?.title,
          description: post?.resume,
          images: post?.image || '/logotipo.png',
        },
        metadataBase: new URL(`https://blog.${NEXT_PUBLIC_URL}/${post?.slug}`),
        alternates: {
          canonical: new URL(`https://blog.${NEXT_PUBLIC_URL}/${post?.slug}`),
        },
        robots: {
          index: true,
          follow: true,
          nocache: true,
        },
      }
    : null
}

export default async function PostDetailPage({
  params,
}: {
  params: { post: string }
}) {
  const post: PostType | any  = await actionGetPostByParams(params?.post)
  const image = '/logotipo.svg'

  return post ? (
    <div className="flex flex-col justify-center">
      <BlogHeader
        title={post?.title}
        subject={post?.subject}
        image={post?.image || image}
      />
      <PostDetailScreen post={post} />
    </div>
  ) : (
    <NotFound />
  )
}
