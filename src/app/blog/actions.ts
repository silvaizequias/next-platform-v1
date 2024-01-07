'use server'

const CONTENT_API_URL = process.env.CONTENT_API_URL!

export async function actionGetPosts() {
  const data = await fetch(`${CONTENT_API_URL}/posts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 3600 },
  })
  return data && data.json()
}
