'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomBytes } from 'crypto'
import { Session } from 'next-auth'
import { s3Client } from '@/libraries/aws'

const AWS_S3_REGION = process.env.AWS_S3_REGION!
const AWS_S3_NAME = process.env.AWS_S3_NAME!

export type SendFileType = {
  formData: FormData
  path?: string
  session?: Session
}

export const sendFile = async (data: SendFileType) => {
  const { formData, path, session } = data

  const file: File | null = (formData.get('file') as File) || null
  const size = file?.size
  const type = file?.type
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const params = {
      Bucket: AWS_S3_NAME!,
      Key: `${path || 'temp'}/${randomBytes(16).toString('hex')}`,
      ContentType: type,
      ContentLength: size,
      Body: buffer,
      Metadata: {
        profile: session?.user?.profile || 'USER',
        userId: session?.user?.id || 'undefined',
      },
    }

    const signedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand(params),
      {
        expiresIn: 60,
      },
    )
    await s3Client.send(new PutObjectCommand(params))

    const url = `https://s3.${AWS_S3_REGION}.amazonaws.com/${AWS_S3_NAME}/${encodeURIComponent(
      params?.Key,
    )}`

    return {
      status: 201,
      message: 'o arquivo foi enviado',
      url: url,
    }
  } catch (error: any) {
    return { status: error?.status, message: error?.message }
  }
}
