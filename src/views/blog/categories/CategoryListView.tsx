'use client'

import useFetch from '@/hooks/useFetch'

export default function CategoryListView() {
  const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL!

  const { data: categories } = useFetch(`${BLOG_API_URL}/categories`)

  return JSON.stringify(categories)
}
