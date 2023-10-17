import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://dedicado.digital'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      //disallow: '/api/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
