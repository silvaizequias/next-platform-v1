import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const NODE_ENV = process.env.NODE_ENV
  const BASE_URL = process.env.BASE_URL ?? ''

  const URL =
    NODE_ENV == 'development'
      ? `${'http://blog.' + BASE_URL}`
      : `${'https://blog.' + BASE_URL}`

  return [
    {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5,
    },
  ]
}
