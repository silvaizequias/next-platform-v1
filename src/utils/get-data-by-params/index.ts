const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const getPostByParams = async (slug: string) => {
  const data = await fetch(`${NEXTAUTH_URL}/api/posts/slug/${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return data && data.json()
}
