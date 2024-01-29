'use server'

const PUBLICATION_URL = process.env.PUBLICATION_URL!
const AUTHORIZATION_KEY = process.env.AUTHORIZATION_KEY!

export async function actionGetPublications() {
  const organization = '52378516000178'
  try {
    const data = await fetch(
      `${PUBLICATION_URL}/publications/organization/${organization}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorizationKey: AUTHORIZATION_KEY,
        },
        //next: { revalidate: 3600 },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    throw new Error(error)
  }
}
