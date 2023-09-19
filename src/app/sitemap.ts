export default async function sitemap() {
  try {
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

    const res = await (await fetch(`${NEXTAUTH_URL}/api/blog/articles`)).json()

    const articles = res.map((article: any) => ({
      url: `${NEXTAUTH_URL}/blog/${article?.slug!}`,
      lastModified: new Date(article?.updatedAt!),
      changeFrequency: 'daily',
      priority: 1,
    }))

    return [
      {
        url: NEXTAUTH_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      {
        url: `${NEXTAUTH_URL}/gestao-de-servicos`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      {
        url: `${NEXTAUTH_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      ...articles,
    ]
  } catch (error: any) {
    console.error(error)
    return new Error(error)
  }
}
