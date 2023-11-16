import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/redefinir-senha',
    },
    sitemap: ` ${NEXTAUTH_URL}/sitemap.xml`,
  }
}
