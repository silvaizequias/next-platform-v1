import { Metadata } from 'next'
import moment from 'moment'
import 'moment/locale/pt-br'
import { PublicationType } from '../types'
import { actionGetPublicationByParams } from './actions'
import { Suspense } from 'react'
import Loading from '@/app/loading'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const publication: PublicationType | any = await actionGetPublicationByParams(
    params?.slug,
  )

  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

  return publication
    ? {
        title: publication?.title,
        description: publication?.resume,
        authors: { name: publication?.author },
        keywords: [publication?.keywords],
        openGraph: {
          title: publication?.title,
          description: publication?.resume,
          images: publication?.image || '/logotipo.png',
        },
        metadataBase: new URL(
          `https://blog.${NEXT_PUBLIC_URL}/${publication?.slug}`,
        ),
        alternates: {
          canonical: new URL(
            `https://blog.${NEXT_PUBLIC_URL}/${publication?.slug}`,
          ),
        },
        robots: {
          index: true,
          follow: true,
          nocache: true,
        },
      }
    : null
}

export default async function PublicationDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const publication: PublicationType | any = await actionGetPublicationByParams(
    params?.slug,
  )

  const image = publication?.image || '/logotipo.svg'

  let style = {
    backgroundImage: 'url(' + image + ')',
  }

  const content = { __html: publication?.content }
  const createdAt = moment(publication?.createdAt).format('LL')
  const author = '@' + publication?.author.split('@')[1]

  return publication ? (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col items-center">
        <div className="z-auto overflow-hidden w-full">
          <div style={style} className="m-0 w-full bg-cover bg-center">
            <div className="relative block backdrop-brightness-50 backdrop-blur-sm">
              <div className="z-auto p-16 min-h-80 h-auto max-w-sm sm:max-w-4xl mx-auto">
                <div className="w-full flex flex-1 justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="font-bold text-center text-2xl sm:text-4xl md:text-6xl lowercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-400">
                      {publication?.title}
                    </h2>
                    <h6 className="font-semibold text-center text-xs sm:text-base text-slate-200 uppercase">
                      {publication?.subject}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
          <div className="w-full flex justify-center">
            <div className="p-8 sm:px-20 max-w-4xl text-center">
              <small className="italic text-xs">{publication?.resume}</small>
            </div>
          </div>
          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
            <div className="flex flex-col justify-center item-center gap-4">
              <div className="w-full">
                <article
                  className="prose-md prose prose-stone m-auto dark:prose-invert sm:prose-lg text-justify"
                  dangerouslySetInnerHTML={content}
                />
              </div>
            </div>
          </div>
          <div className="pt-8 sm:px-20 max-w-4xl text-center text-xs lowercase opacity-50">
            esta publicação foi criada em{' '}
            <span className="font-semibold">{createdAt}</span> por{' '}
            <span className="font-semibold">{author}</span>{' '}
            {publication?.generatedByAi && (
              <span>usando inteligência artificial</span>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  ) : null
}
