import { Metadata } from 'next'
import { actionGetPublicationByParams } from './actions'
import PublicationScreen from './screen'
import { PublicationType } from '@/app/main/(management)/publications/types'

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

  return publication ? <PublicationScreen publication={publication} /> : null
}
