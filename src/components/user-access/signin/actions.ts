'use server'

export async function actionSubmitSignIn(formData: FormData) {
  const inputs = Object.fromEntries(formData)
  console.log(inputs)
}
