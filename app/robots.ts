import { mainUrl } from '@/app/core/helpers'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${mainUrl}/sitemap.xml`,
  }
}
