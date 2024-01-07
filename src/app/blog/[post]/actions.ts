'use server'

const CONTENT_API_URL = process.env.CONTENT_API_URL!

export async function actionGetPostByParams(slug: string) {
  const data = await fetch(`${CONTENT_API_URL}/posts/slug/${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    //next: { revalidate: 3600 },
  })
  return data && data.json()
}
