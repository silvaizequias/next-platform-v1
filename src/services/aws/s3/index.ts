'use server'

import { revalidatePath } from 'next/cache'
import {
  S3Client,
  PutObjectCommand,
  ServerSideEncryption,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { computeSHA256 } from '@/helpers'
import { Session } from 'next-auth'

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

interface Props {
  data: FormData
  path?: string
  session?: Session
}

export async function uploadFileS3(props: Props): Promise<any> {
  const { data, path, session } = props

  const file: File | null = (data.get('file') as File) || null
  const size = file?.size
  const type = file?.type
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex')

  try {
    const params = {
      Bucket: AWS_S3_NAME!,
      Key: `${path || 'temp'}/${generateFileName()}`,
      ContentType: type,
      ContentLength: size,
      Body: buffer,
      Metadata: {
        profile: session?.user?.profile || 'USER',
        userId: session?.user?.id || 'undefined'
      },
      //ChecksumSHA256: await computeSHA256(file),
    }

    const putObjectCommand = new PutObjectCommand(params)

    //const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    //  expiresIn: 60,
    //})

    await s3Client.send(putObjectCommand)
    const encodeFileName = encodeURIComponent(params?.Key)
    const url = `https://s3.${AWS_S3_REGION}.amazonaws.com/${AWS_S3_NAME}/${encodeFileName}`

    return {
      status: 200,
      message: 'o arquivo foi enviado',
      url: url,
    }
  } catch (error: any) {
    console.log(error)
    return { status: error?.status, message: error?.message }
  }
}
