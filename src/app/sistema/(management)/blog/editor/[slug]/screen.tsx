'use client'

import { useParams } from 'next/navigation'
import BlogEditorView from '../views/BlogEditorView'
import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import NotFound from '@/app/not-found'

export default function BlogEditorSlugScreen() {
  const params: any = useParams()

  const { data: post } = useFetch<PostType | any>(
    `/api/posts/slug/${params?.slug}`,
  )

  return post ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center bg-slate-100 rounded-md p-4 shadow-md">
        <BlogEditorView method="PATCH" post={post} />
      </div>
    </div>
  ) : (
    <NotFound />
  )
}
