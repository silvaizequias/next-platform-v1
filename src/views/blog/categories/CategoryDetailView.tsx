'use client'

import useFetch from '@/hooks/useFetch'
import { useParams } from 'next/navigation'

export default function CategoryDetailView() {
  const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!

  const params = useParams()
  const { slug } = params

  const { data: category } = useFetch(`${BLOG_API_URL}/categories/slug/${slug}`)

  return JSON.stringify(category)
}
