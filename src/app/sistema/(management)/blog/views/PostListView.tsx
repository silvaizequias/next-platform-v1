'use client'

import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'

export default function PostListView() {
  const { data: posts } = useFetch<PostType[] | any>('/api/posts')

  return posts ? (
    JSON.stringify(posts)
  ) : (
    <h6 className="text-lg sm:text-xl text-center lowercase">
      Sem postagens para exibir!
    </h6>
  )
}
