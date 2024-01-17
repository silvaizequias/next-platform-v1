'use server'

const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
const PUBLICATION_AUTHORIZATION_KEY = process.env.PUBLICATION_AUTHORIZATION_KEY!

export async function actionGetPublications() {
  const organization = '52378516000178'
  try {
    const response = await fetch(
      `${PUBLICATION_API_URL}/domains/organization/${organization}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: PUBLICATION_AUTHORIZATION_KEY,
        },
        next: { revalidate: 3600 }
      },
    )
    if (!response) return null
    const domain = response && (await response.json())
    const { publications } = domain

    return publications
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function actionGetPublicationByParams(slug: string) {
  try {
    const publication = await fetch(
      `${PUBLICATION_API_URL}/publications/slug/${slug}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: PUBLICATION_AUTHORIZATION_KEY,
        },
        next: { revalidate: 3600 }
      },
    )
    if (!publication) return null

    return publication && (await publication.json())
  } catch (error: any) {
    throw new Error(error)
  }
}
