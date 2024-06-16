'use server'

import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime'
import { S3Client } from '@aws-sdk/client-s3'
import { SESClient } from '@aws-sdk/client-ses'
import { SNSClient } from '@aws-sdk/client-sns'

const credentials = {
  accessKeyId: process.env.PLATFORM_AWS_ACCESS_KEY ?? '',
  secretAccessKey: process.env.PLATFORM_AWS_PRIVATE_KEY ?? '',
}

export function bedrockRuntimeClient() {
  const client = new BedrockRuntimeClient({
    region: process.env.PLATFORM_AWS_BEDROCK_REGION ?? '',
    credentials: credentials,
  })

  return client
}

export function s3Client() {
  const client = new S3Client({
    region: process.env.PLATFORM_AWS_S3_REGION ?? '',
    credentials: credentials,
  })

  return client
}

export function sesClient() {
  const client = new SESClient({
    region: process.env.PLATFORM_AWS_SES_REGION ?? '',
    credentials: credentials,
  })

  return client
}

export function snsClient() {
  const client = new SNSClient({
    region: process.env.PLATFORM_AWS_SES_REGION ?? '',
    credentials: credentials,
  })

  return client
}
