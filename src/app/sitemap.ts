import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  return [
    {
      url: NEXTAUTH_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/blog/categorias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/blog/postagens`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/registrar-se`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/suporte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/suporte/correcao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/suporte/migracao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${NEXTAUTH_URL}/termos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
