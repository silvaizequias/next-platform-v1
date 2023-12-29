import { getPosts } from '@/utils/get-data'

export default async function Sitemap() {

  const posts = await getPosts()

  return [
    {
      url: `https://dedicado.digital`,
      lastModified: new Date(),
    },
    ...posts?.map(({ slug }: any) => ({
      url: `https://blog.dedicado.digital/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
