import * as z from 'zod'

const EnvSchema = z.object({
  BASE_URL: z.string(),
  SECRET: z.string(),
  ORDER_API_URL: z.string().url(),
  PLATFORM_API_URL: z.string().url(),
  PUBLICATION_API_URL: z.string().url(),
})

export const env = EnvSchema.parse(process.env)
