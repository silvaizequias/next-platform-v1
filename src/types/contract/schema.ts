import * as z from 'zod'

export const ContractCreateSchema = z.object({
  userId: z.string(),
  solutionId: z.string(),
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

export type ContractCreateSchemaType = z.infer<typeof ContractCreateSchema>

export const ContractUpdateSchema = z.object({
  userId: z.string(),
  solutionId: z.string(),
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

export type ContractUpdateSchemaType = z.infer<typeof ContractUpdateSchema>
