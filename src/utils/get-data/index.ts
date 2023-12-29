const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const getPosts = async () => {
  const data = await fetch(`${NEXTAUTH_URL}/api/posts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 3600 },
  })
  return data && data.json()
}
