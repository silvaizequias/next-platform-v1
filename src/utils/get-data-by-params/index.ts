const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const getPostByParams = async (slug: string) => {
  if (!slug) return null

  const data = await fetch(`${NEXTAUTH_URL}/api/posts/slug/${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 3600 },
  })
  return data && data.json()
}
