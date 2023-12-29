import { getPosts } from '@/utils/get-data'

export default async function Sitemap() {
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!

  const posts = await getPosts()

  return [
    {
      url: `https://${NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
    },
    ...posts?.map(({ slug }: any) => ({
      url: `https://blog.${NEXT_PUBLIC_URL}/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
