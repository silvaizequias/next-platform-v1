'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useCallback } from 'react'
import { PublicationType } from '../../types'
import PublicationCardView from '../publication-card-view'
import Loading from '@/app/loading'

interface Props {
  publications: PublicationType[]
}

export default function PublicationView(props: Props) {
  const { publications } = props

  const router = useRouter()

  const handleClick = useCallback(
    (slug: string) => {
      slug && router.push(slug)
    },
    [router],
  )

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <div className="flex justify-center items-center p-8 mt-6"></div>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          <div className="flex flex-col justify-center item-center gap-4">
            <div className="w-full">
              {publications &&
                publications?.map(
                  (publication: PublicationType) =>
                    publication?.channel == 'blog' && (
                      <div
                        key={publication?.id}
                        className="cursor-pointer hover:opacity-80 hover:shadow-lg max-h-fit"
                        onClick={() => handleClick(publication?.slug)}
                      >
                        <PublicationCardView publication={publication} />
                      </div>
                    ),
                )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
