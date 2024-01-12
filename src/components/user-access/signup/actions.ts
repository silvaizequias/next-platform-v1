'use server'

export async function actionSubmitSignUp(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
