import * as z from 'zod'

const schema = z.object({
  BASE_URL: z.string(),
  SECRET: z.string(),
  ORDER_API_URL: z.string().url(),
  PLATFORM_API_URL: z.string().url(),
  PUBLICATION_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
  SENDGRID_API_KEY: z.string(),
  SENDGRID_EMAIL_FROM: z.string().email(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_PHONE_NUMBER: z.string(),
})

export const env = schema.parse(process.env)
