import {
  UploadFileValidation,
  UploadFileValidationType,
} from '@/validations/upload-file'
import { File } from 'buffer'

export async function POST(request: Request, file: File) {
  try {
    const inputs: UploadFileValidationType = await request.json()
    if (file && await UploadFileValidation.parseAsync(inputs)) {
      const { name, bucket } = inputs

      const params = {
        Bucket: bucket,
        Key: name,
        ContentType: file.type,
        ContentLength: file.size,
        Body: file.arrayBuffer,
      }

      console.log(params)

      return new Response(JSON.stringify('file uploaded'))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
