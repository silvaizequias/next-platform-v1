import * as z from 'zod'

export const StripeCheckoutSchema = z.object({
  amount: z.coerce.number().positive(),
  service: z.string(),
  description: z.string(),
  userId: z.string(),
  userEmail: z.string().email(),
})

export type StripeCheckoutSchemaType = z.infer<typeof StripeCheckoutSchema>
