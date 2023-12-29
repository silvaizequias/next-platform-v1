import { headers } from 'next/headers'
import { getPosts } from '@/utils/get-data'

export default async function Sitemap() {
  const headersList = headers()
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_URL}`)

  const posts = await getPosts()

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...posts?.map(({ slug, updatedAt }: any) => ({
      url: `https://blog.${domain}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
  ]
}
