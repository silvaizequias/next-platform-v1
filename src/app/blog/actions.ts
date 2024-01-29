'use server'

const PUBLICATION_URL = process.env.PUBLICATION_URL!
const AUTHORIZATION_KEY = process.env.AUTHORIZATION_KEY!

export async function actionGetPublications() {
  const organization = '52378516000178'
  try {
    const response = await fetch(
      `${PUBLICATION_URL}/publications/organization/${organization}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorizationKey: AUTHORIZATION_KEY,
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
