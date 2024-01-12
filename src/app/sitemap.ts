import { headers } from 'next/headers'
import { actionGetPosts } from './blog/actions'
import { PostType } from './blog/types'

export default async function Sitemap() {
  const headersList = headers()
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3210', `.${process.env.NEXT_PUBLIC_URL}`)

  const posts: PostType | any = await actionGetPosts()

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
