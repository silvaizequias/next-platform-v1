import * as z from 'zod'

export const SubscriptionCreateSchema = z.object({
  userDocCode: z.string().optional(),
  solutionUrl: z.string().url().optional(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
  stripePriceId: z.string(),
  currentPeriodStart: z.coerce.date().optional(),
  currentPeriodEnd: z.coerce.date().optional(),
  note: z.string().optional(),
  discount: z.coerce.number().positive().default(0).optional(),
  tax: z.coerce.number().positive().default(0).optional(),
  amount: z.coerce.number().positive().default(0).optional(),
  isActive: z.boolean().default(true).optional(),
})

export type SubscriptionCreateSchemaType = z.infer<typeof SubscriptionCreateSchema>

export const SubscriptionUpdateSchema = z.object({
  userDocCode: z.string().optional(),
  solutionUrl: z.string().url().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  currentPeriodStart: z.coerce.date().optional(),
  currentPeriodEnd: z.coerce.date().optional(),
  note: z.string().optional(),
  discount: z.coerce.number().positive().default(0).optional(),
  tax: z.coerce.number().positive().default(0).optional(),
  amount: z.coerce.number().positive().default(0).optional(),
  isActive: z.boolean().default(true).optional(),
})

export type SubscriptionUpdateSchemaType = z.infer<typeof SubscriptionUpdateSchema>
