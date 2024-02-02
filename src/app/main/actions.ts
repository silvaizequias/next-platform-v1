'use server'

export async function actionGetMyOrganizations(id: string) {
  try {
    return id
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
