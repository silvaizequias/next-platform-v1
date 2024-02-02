'use server'

export async function actionGetOrganizationByDocument(document: string) {
  try {
    return document
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
