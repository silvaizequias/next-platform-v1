'use server'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetOrganizationKeys() {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/organization-keys`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return data && (await data.json())
  } catch (error: any) {
    throw new Error(error)
  }
}
