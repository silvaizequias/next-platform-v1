import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const NODE_ENV = process.env.NODE_ENV
  const BASE_URL = process.env.BASE_URL ?? ''

  const URL =
    NODE_ENV == 'development'
      ? `${'http://blog.' + BASE_URL}`
      : `${'https://blog.' + BASE_URL}`

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${URL}/sitemap.xml`,
  }
}
