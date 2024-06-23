import { environment } from '@/environments'
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime'
import { S3Client } from '@aws-sdk/client-s3'
import { SESClient } from '@aws-sdk/client-ses'
import { SNSClient } from '@aws-sdk/client-sns'

type AWSCredentialsType = {
  accessKeyId: string
  secretAccessKey: string
}

export default class AWS {
  private environment = environment
  private credentials: AWSCredentialsType = {
    accessKeyId: this.environment.awsAccessKey,
    secretAccessKey: this.environment.awsPrivateKey,
  }

  readonly bedrockRuntimeClient = new BedrockRuntimeClient({
    region: this.environment.awsBedrockRegion,
    credentials: this.credentials,
  })

  readonly s3Client = new S3Client({
    region: this.environment.awsS3Region,
    credentials: this.credentials,
  })

  readonly sesClient = new SESClient({
    region: this.environment.awsSESRegion,
    credentials: this.credentials,
  })

  readonly snsClient = new SNSClient({
    region: this.environment.awsSNSRegion,
    credentials: this.credentials,
  })
}
