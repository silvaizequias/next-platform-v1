'use server'

export async function actionGetSlugPublication(slug: string) {
  try {
    return slug
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
