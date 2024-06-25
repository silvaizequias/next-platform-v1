import AWS from '@/aws'
import { environment } from '@/environments/index'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export default class UploadActions {
  private aws = new AWS()
  private awsS3Region = environment.awsS3Region

  async uploadFile(formData: FormData, bucket: string) {
    const file: File | null = (formData.get('file') as File) || null

    const name = file.name.replace(/[^a-zA-Z\\w\\s]|_/g, '').split('.')[0]
    const data = Buffer.from(await file.arrayBuffer())

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: name,
      ContentType: file.type,
      ContentLength: file.size,
      Body: data,
    })

    const url = `https://s3.${
      this.awsS3Region
    }.amazonaws.com/${bucket}/${encodeURIComponent(name)}`

    return await this.aws.s3Client
      .send(putObjectCommand)
      .then(() => {
        return { url: url }
      })
      .catch((error: any) => new Error(error?.message, error?.status))
  }
}
