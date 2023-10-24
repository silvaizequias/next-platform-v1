import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: ` ${NEXTAUTH_URL}/sitemap.xml`,
  }
}
