import * as z from 'zod'

const EnvSchema = z.object({
  BASE_URL: z.string().optional(),
  SECRET: z.string().optional(),
  ORDER_API_URL: z.string().url().optional(),
  PLATFORM_API_URL: z.string().url().optional(),
  PUBLICATION_API_URL: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_EMAIL_FROM: z.string().email().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
})

export const env = EnvSchema.parse(process.env)
