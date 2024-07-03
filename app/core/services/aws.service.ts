import { environment } from '@/environments'
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime'
import { S3Client } from '@aws-sdk/client-s3'
import { SESClient } from '@aws-sdk/client-ses'
import { SNSClient } from '@aws-sdk/client-sns'

type AWSCredentials = {
  accessKeyId: string
  secretAccessKey: string
}

export class AWSService {
  private readonly credentials: AWSCredentials = {
    accessKeyId: environment.PLATFORM_AWS_ACCESS_KEY,
    secretAccessKey: environment.PLATFORM_AWS_PRIVATE_KEY,
  }

  readonly bedrockRuntimeClient = new BedrockRuntimeClient({
    region: environment.PLATFORM_AWS_BEDROCK_REGION,
    credentials: this.credentials,
  })

  readonly s3Client = new S3Client({
    region: environment.PLATFORM_AWS_S3_REGION,
    credentials: this.credentials,
  })

  readonly sesClient = new SESClient({
    region: environment.PLATFORM_AWS_SES_REGION,
    credentials: this.credentials,
  })

  readonly snsClient = new SNSClient({
    region: environment.PLATFORM_AWS_SNS_REGION,
    credentials: this.credentials,
  })
}
