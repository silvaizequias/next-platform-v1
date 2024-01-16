import NotFound from '@/app/not-found'
import { Metadata } from 'next'
import BlogHeader from '@/components/blog-header'
import { actionGetPublicationByParams } from './actions'
import { PublicationType } from '../types'
import PublicationDetailScreen from './screen'

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
  const image = '/logotipo.svg'

  return publication ? (
    <div className="flex flex-col justify-center">
      <BlogHeader
        title={publication?.title}
        subject={publication?.subject}
        image={publication?.image || image}
      />
      <PublicationDetailScreen publication={publication} />
    </div>
  ) : (
    <NotFound />
  )
}
