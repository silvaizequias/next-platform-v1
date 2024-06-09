import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const NODE_ENV = process.env.NODE_ENV
  const BASE_URL = process.env.BASE_URL ?? ''

  const URL =
    NODE_ENV == 'development'
      ? `${'http://' + BASE_URL}`
      : `${'https://' + BASE_URL}`

  return [
    {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${URL}/registrar-se`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${URL}/termos-e-politicas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
