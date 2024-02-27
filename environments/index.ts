import * as z from 'zod'

const schema = z.object({
  SECRET: z.string(),
  BASE_URL: z.string(),
  MANAGEMENT_API_URL: z.string().url(),
  ORDERS_API_URL: z.string().url(),
  ZIPCODE_API_URL: z.string(),
})

export const env = schema.parse(process.env)
