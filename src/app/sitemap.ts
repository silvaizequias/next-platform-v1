import { headers } from 'next/headers'
import { actionGetPosts } from './blog/actions'

export default async function Sitemap() {
  const headersList = headers()
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3210', `.${process.env.NEXT_PUBLIC_URL}`)

  const posts = await actionGetPosts()

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
