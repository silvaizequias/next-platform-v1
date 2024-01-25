'use server'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetUsers() {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await data.json()
  } catch (error: any) {
    throw new Error(error)
  }
}
