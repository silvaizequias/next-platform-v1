import * as z from 'zod'

export const SubscriptionCreateDTO = z.object({
  userEmail: z.string().email().optional(),
  serviceSolution: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripeCurrentPeriodEnd: z.coerce.date().optional(),
})
export type SubscriptionCreateDTOType = z.infer<typeof SubscriptionCreateDTO>

export const SubscriptionUpdateDTO = z.object({
  userEmail: z.string().email().optional(),
  serviceSolution: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripeCurrentPeriodEnd: z.coerce.date().optional(),
})
export type SubscriptionUpdateDTOType = z.infer<typeof SubscriptionUpdateDTO>
