'use client'

import useFetch from '@/hooks/use-fetch'
import { useRouter } from 'next/navigation'
import { Suspense, useCallback } from 'react'
import { PublicationType } from '../main/(management)/publications/types'
import PublicationCardView from './views/publication-card-view'

export default function BlogScreen() {
  const organization = '52378516000178'
  const logotipo = '/logotipo.svg'

  let style = {
    backgroundImage: 'url(' + logotipo + ')',
  }

  const { data: publications } = useFetch<PublicationType[] | any>(
    `/api/publication-management/publications`,
  )

  const router = useRouter()

  const handleClick = useCallback(
    (slug: string) => {
      slug && router.push(slug)
    },
    [router],
  )

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="z-auto overflow-hidden w-full">
        <div style={style} className="m-0 min-w-screen bg-cover bg-center">
          <div className="relative block backdrop-brightness-50 backdrop-blur-sm">
            <div className="z-auto p-16 min-h-80 h-auto max-w-sm sm:max-w-4xl mx-auto">
              <div className="w-full flex flex-1 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="font-bold text-center text-2xl sm:text-4xl md:text-6xl lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400">
                    blog dedicado
                  </h2>
                  <h6 className="font-semibold text-center text-xs sm:text-base text-slate-200 uppercase">
                    conteúdo inteligente
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
          <div className="flex justify-center items-center p-8 mt-6"></div>
          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
            <div className="flex flex-col justify-center item-center gap-4">
              <div className="w-full">
                {publications &&
                  publications?.map(
                    (publication: PublicationType) =>
                      publication?.domain.organization == organization &&
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
    </div>
  )
}
