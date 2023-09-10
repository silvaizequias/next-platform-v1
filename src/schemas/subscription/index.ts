import * as z from 'zod'

const RECURRING_INTERVAL = ['DAY', 'WEEK', 'MONTH', 'YEAR'] as const
const STATUS = [
  'INCOMPLETE',
  'INCOMPLETE_EXPIRED',
  'TRIALING',
  'ACTIVE',
  'PAST_DUE',
  'CANCELED',
  'UNPAID',
] as const

export const SubscriptionCreateSchema = z.object({
  serviceId: z.string().optional(),
  userId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  currentPeriodStart: z.coerce.date().optional(),
  recurringInterval: z.enum(RECURRING_INTERVAL).optional(),
  currentPeriodEnd: z.coerce.date().optional(),
  status: z.enum(STATUS).optional(),
  note: z.string().optional(),
  discount: z.number().positive().default(0).optional(),
  tax: z.number().positive().default(0).optional(),
  amount: z.number().positive().default(0),
})

export type SubscriptionCreateSchemaType = z.infer<
  typeof SubscriptionCreateSchema
>

export const SubscriptionUpdateSchema = z.object({
  serviceId: z.string().optional(),
  userId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  currentPeriodStart: z.coerce.date().optional(),
  recurringInterval: z.enum(RECURRING_INTERVAL).optional(),
  currentPeriodEnd: z.coerce.date().optional(),
  status: z.enum(STATUS).optional(),
  note: z.string().optional(),
  discount: z.number().positive().default(0).optional(),
  tax: z.number().positive().default(0).optional(),
  amount: z.number().positive().default(0).optional(),
})

export type SubscriptionUpdateSchemaType = z.infer<
  typeof SubscriptionUpdateSchema
>
