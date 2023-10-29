'use client'

import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'

export default function PostDetailView() {
  const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!

  const params = useParams()
  const { slug } = params

  const { data: post } = useFetch(`${BLOG_API_URL}/posts/slug/${slug}`)

  return JSON.stringify(post)
}
