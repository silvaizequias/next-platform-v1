'use client'

import useFetch from '@/hooks/use-fetch'
import { PostType } from '@/types/post'
import { useParams } from 'next/navigation'

export default function PostDetailScreen() {
  const params: any = useParams()
  const { data: post } = useFetch<PostType | any>(
    `/api/posts/slug/${params?.slug}`,
  )

  return (
    <section className="flex flex-col justify-center">
      <div className="py-14">
        <div className="mx-2 sm:mx-8 text-center">
          <div className="my-2 sm:my-4 mx-auto md:mx-40">
            <h1 className="text-4xl sm:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-light-blue-200 font-semibold lowercase">
              {post?.title}
            </h1>
          </div>
          <div className="my-2 sm:my-4 mx-auto md:mx-40">
            <h4 className="text-lg sm:text-xl font-normal uppercase">
              {post?.subject}
            </h4>
          </div>
          <div className="my-6 mx-24 sm:mx-40 md:mx-60">
            <div className="my-2 bg-slate-400 px-14"></div>
          </div>
          <div className="my-2 sm:my-4 mx-auto md:mx-60">
            <p className="italic">{post?.resume}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
