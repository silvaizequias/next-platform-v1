/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
import { actionGetPublicationByParams } from '@/app/main/(management)/publications/actions'
import { PublicationType } from '@/app/main/(management)/publications/types'

export const runtime = 'edge'

export default async function PublicationOG({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const publication: PublicationType | any = await actionGetPublicationByParams(
    slug,
  )

  const image = '/logotipo.svg'

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center w-full h-full bg-white">
        <div tw="flex flex-col items-center justify-center mt-8">
          <h1 tw="text-6xl font-bold text-gray-900 leading-none tracking-tight">
            {publication.title}
          </h1>
          <p tw="mt-4 text-xl text-gray-600 max-w-xl text-center line-clamp-3">
            {publication.resume}
          </p>
          <div tw="flex items-center justify-center">
            <img
              tw="w-12 h-12 rounded-full mr-4"
              src={publication?.image || image}
              alt={publication?.subject}
            />
            <p tw="text-xl font-medium text-gray-900">
              by {publication?.author}
            </p>
          </div>
          <img
            tw="mt-4 w-5/6 rounded-2xl border border-gray-200 shadow-md"
            src={publication?.image || image}
            alt={publication?.title}
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
