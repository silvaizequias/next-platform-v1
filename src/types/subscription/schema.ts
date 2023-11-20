import * as z from 'zod'

export const SubscriptionCreateSchema = z.object({
  userEmail: z.string().email().optional(),
  serviceSolution: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripeCurrentPeriodEnd: z.coerce.date().optional(),
})
export type SubscriptionCreateSchemaType = z.infer<
  typeof SubscriptionCreateSchema
>

export const SubscriptionUpdateSchema = z.object({
  userEmail: z.string().email().optional(),
  serviceSolution: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripeCurrentPeriodEnd: z.coerce.date().optional(),
})
export type SubscriptionUpdateSchemaType = z.infer<
  typeof SubscriptionUpdateSchema
>
