import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return [
    {
      url: NEXTAUTH_URL + '/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: NEXTAUTH_URL + '/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]
}
