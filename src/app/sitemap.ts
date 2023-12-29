import { getPosts } from '@/utils/get-data'
import { headers } from 'next/headers'

export default async function Sitemap() {
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!
  const headersList = headers()
  const domain =
    headersList
      .get('host')
      ?.replace('.localhost:3000', `.${NEXT_PUBLIC_URL}`) ?? 'dedicado.digital'

  const posts = await getPosts()

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...posts?.map(({ slug }: any) => ({
      url: `https://blog.${domain}/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
