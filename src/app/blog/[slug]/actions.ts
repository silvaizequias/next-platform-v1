'use server'

const PUBLICATION_URL = process.env.PUBLICATION_URL!
const PUBLICATION_KEY = process.env.PUBLICATION_KEY!

export async function actionGetPublicationByParams(slug: string) {
  try {
    const publication = await fetch(
      `${PUBLICATION_URL}/publications/slug/${slug}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: PUBLICATION_KEY,
        },
        next: { revalidate: 3600 },
      },
    )
    if (!publication) return null

    return publication && (await publication.json())
  } catch (error: any) {
    throw new Error(error)
  }
}
