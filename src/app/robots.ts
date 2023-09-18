import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog', '/blog/*'],
      disallow: ['/api', '/control'],
    },
    sitemap: `${NEXTAUTH_URL}/sitemap.xml`,
  }
}
