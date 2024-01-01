export async function uploadFileAction(formData: FormData) {
  const file: File = formData.get('file') as File

  try {
    const send = await fetch(`/api/aws/s3`, {
      method: 'POST',
      body: formData,
    })
    return send && send.text()
  } catch (error: any) {
    console.error(error)
    return error && error?.message
  }
}
