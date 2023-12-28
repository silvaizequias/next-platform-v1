import { getPostByParams } from '@/utils/get-data-by-params'
import PostDetailScreen from './screen'
import NotFound from '@/app/not-found'
import { Metadata } from 'next'
import { PostType } from '@/types/post'
import BlogHeader from '@/components/blog-header'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const post: PostType = await getPostByParams(params?.slug)

  return post
    ? {
        title: post?.title,
        description: post?.resume,
        authors: { name: post?.author },
        keywords: post?.keywords,
        openGraph: {
          title: post?.title,
          description: post?.resume,
          images: '/logotipo.png',
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
  params: { slug: string }
}) {
  const post = await getPostByParams(params?.slug)

  return post ? (
    <div className="flex flex-col justify-center">
      <BlogHeader title={post?.title} subject={post?.subject} />
      <PostDetailScreen post={post} />
    </div>
  ) : (
    <NotFound />
  )
}
