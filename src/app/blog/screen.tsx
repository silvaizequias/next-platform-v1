'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { PublicationType } from './types'
import useFetch from '@/hooks/use-fetch'
import PublicationCardView from './views/PublicationCardView'

export default function BlogScreen() {
  const organization = '52378516000178'
  const { data } = useFetch(`/api/publication-management/publications`)

  const router = useRouter()

  const handleClick = useCallback(
    (slug: string) => {
      slug && router.push(slug)
    },
    [router],
  )

  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {data &&
          data?.map(
            (publication: PublicationType) =>
              publication?.domain?.organization == organization && (
                <div
                  className="cursor-pointer hover:opacity-50"
                  key={publication?.id}
                  onClick={() => handleClick(publication?.slug)}
                >
                  <PublicationCardView publication={publication} />
                </div>
              ),
          )}
      </div>
    </div>
  )
}
