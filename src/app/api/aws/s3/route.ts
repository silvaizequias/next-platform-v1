import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!
const AWS_S3_REGION = process.env.AWS_S3_REGION!
const AWS_S3_NAME = process.env.AWS_S3_NAME!

const s3Client = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

export async function POST(request: Request) {
  try {
    const inputs: FormData = await request.formData()
    const file: File | null  = inputs.get('file') as File
    const folder: string | null = inputs.get('folder') as string

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const name = file.name.replace(/[^0-9]/g, '')
      const type = file.type

      const params = {
        Bucket: AWS_S3_NAME,
        Key: `${folder}/${new Date().getTime()}-${name}`,
        Body: buffer,
        ContentType: type,
      }
      const encodeFileName = encodeURIComponent(params?.Key)

      const command = new PutObjectCommand(params)
      await s3Client.send(command)
      const url = `https://s3.${AWS_S3_REGION}.amazonaws.com/${AWS_S3_NAME}/${encodeFileName}`

      return new Response(url, {
        status: 201,
      })
    }
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  } finally {
  }
}
