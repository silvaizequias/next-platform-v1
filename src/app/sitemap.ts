import { ArticleType } from '@/views/blog/types'
import axios from 'axios'
export default async function sitemap() {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  const articles: ArticleType[] = await (
    await axios.get(`${NEXTAUTH_URL}/api/blog/articles`)
  ).data

  const articleMap =
    articles?.map((article: ArticleType) => {
      return {
        url: `${NEXTAUTH_URL}/blog/${article?.slug!}`,
        lastModified: new Date(article?.updatedAt!),
        //changeFrequency: 'daily',
        //priority: 0.5,
      }
    }) ?? []

  return [
    {
      url: NEXTAUTH_URL + '/',
      lastModified: new Date(),
      //changeFrequency: 'daily',
      //priority: 0.5,
    },
    ...articleMap,
  ]
}