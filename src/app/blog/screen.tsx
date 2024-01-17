'use client'

import useFetch from '@/hooks/use-fetch'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="z-auto overflow-hidden w-full">
        <div style={style} className="m-0 w-full bg-cover bg-center">
          <div className="z-auto pt-16 h-80 mx-auto relative block backdrop-brightness-50 backdrop-blur-sm">
            <div className="min-h-full px-10 flex flex-col justify-center items-center">
              <div className="mx-auto text-center">
                <h4 className="font-bold text-2xl sm:text-4xl md:text-6xl lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400">
                  blog dedicado
                </h4>
              </div>
              <div className="mx-auto my-6 px-8 sm:px-16 text-center">
                <h6 className="font-semibold text-sm sm:text-base text-slate-200 uppercase">
                  conteúdo inteligente
                </h6>
              </div>
            </div>
          </div>
        </div>
      </header>
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
    </div>
  )
}
