import * as z from 'zod'

export const StripeCheckoutSchema = z.object({
  serviceId: z.string(),
  serviceName: z.string(),
  serviceDescription: z.string(),
  serviceAmount: z.coerce.number().positive(),
  userId: z.string(),
  userEmail: z.string().email(),
})

export type StripeCheckoutSchemaType = z.infer<typeof StripeCheckoutSchema>
