import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return [
    {
      url: NEXTAUTH_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
