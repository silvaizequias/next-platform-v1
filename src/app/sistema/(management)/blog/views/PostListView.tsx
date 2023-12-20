'use client'

import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'

export default function PostListView() {
  const { data: posts } = useFetch<PostType[] | any>('/api/posts')

  return ''
}
