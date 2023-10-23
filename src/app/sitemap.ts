import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = process.env.BASE_URL!

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
