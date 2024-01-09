'use server'

export async function actionSubmitResetPassword(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
