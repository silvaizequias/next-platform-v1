'use client'

import useFetch from '@/hooks/useFetch'

export default function PostListView() {
  const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!
  const { data: posts } = useFetch(`${BLOG_API_URL}/posts`)

  return JSON.stringify(posts)
}
