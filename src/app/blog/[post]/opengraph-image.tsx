/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
import { PostType } from '../types'
import { actionGetPostByParams } from './actions'

export const runtime = 'edge'

export default async function PostOG({ params }: { params: { post: string } }) {
  const post: PostType = await actionGetPostByParams(params?.post)

  const image = '/logotipo.svg'

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center w-full h-full bg-white">
        <div tw="flex flex-col items-center justify-center mt-8">
          <h1 tw="text-6xl font-bold text-gray-900 leading-none tracking-tight">
            {post.title}
          </h1>
          <p tw="mt-4 text-xl text-gray-600 max-w-xl text-center line-clamp-3">
            {post.resume}
          </p>
          <div tw="flex items-center justify-center">
            <img
              tw="w-12 h-12 rounded-full mr-4"
              src={post?.image || image}
              alt={post?.subject}
            />
            <p tw="text-xl font-medium text-gray-900">by {post?.author}</p>
          </div>
          <img
            tw="mt-4 w-5/6 rounded-2xl border border-gray-200 shadow-md"
            src={post?.image || image}
            alt={post?.title}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
