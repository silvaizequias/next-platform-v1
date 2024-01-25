import { headers } from 'next/headers'
import { actionGetPublications } from './blog/actions'
import { PublicationType } from './blog/types'

export default async function Sitemap() {
  const headersList = headers()
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3210', `.${process.env.NEXT_PUBLIC_URL}`)

  const publication: PublicationType | any = await actionGetPublications()

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...publication?.map(({ slug, updatedAt }: any) => ({
      url: `https://blog.${domain}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
  ]
}
