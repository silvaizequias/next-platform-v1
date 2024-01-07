'use client'

import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import PostCardView from './views/PostCardView'

interface Props {
  posts: PostType[]
}
export default function BlogScreen(props: Props) {
  const { posts } = props

  const router = useRouter()

  const handleClick = useCallback(
    (slug: string) => {
      slug && router.push(slug)
    },
    [router],
  )

  return (
    <div className="w-full flex flex-1 justify-center">
      <div className="flex flex-wrap justify-center gap-4">
        {posts &&
          posts?.map(
            (post: PostType) =>
              !post?.draft &&
              !post?.spotlight && (
                <div
                  className="cursor-pointer hover:opacity-50"
                  key={post?.id}
                  onClick={() => handleClick(post?.slug)}
                >
                  <PostCardView post={post} />
                </div>
              ),
          )}
      </div>
    </div>
  )
}
