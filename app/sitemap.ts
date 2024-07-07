import { mainUrl } from '@/app/core/helpers'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${mainUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${mainUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${mainUrl}/termos-e-politicas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
  ]
}
