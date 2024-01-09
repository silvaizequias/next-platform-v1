'use server'

export async function actionSubmitSignIn(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
