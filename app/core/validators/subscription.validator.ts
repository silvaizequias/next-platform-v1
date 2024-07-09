import * as z from 'zod'

export const PAYMENT_GATEWAY = ['stripe'] as const

export const createSubscription = z.object({
  organizationDocument: z.string().optional(),
  active: z.boolean().optional().default(true),
  paymentGateway: z.enum(PAYMENT_GATEWAY).optional().default('stripe'),
  paymentCustomerId: z.string().optional(),
  paymentSubscriptionId: z.string().optional(),
  paymentPriceId: z.string().optional(),
  credit: z.coerce.number().positive().optional().default(100),
  unlimited: z.boolean().optional().default(false),
})
export type createSubscriptionType = z.infer<typeof createSubscription>

export const updateSubscription = z.object({
  active: z.boolean().optional(),
  paymentGateway: z.enum(PAYMENT_GATEWAY).optional(),
  paymentCustomerId: z.string().optional(),
  paymentSubscriptionId: z.string().optional(),
  paymentPriceId: z.string().optional(),
  credit: z.coerce.number().positive().optional(),
  unlimited: z.boolean().optional(),
})
export type updateSubscriptionType = z.infer<typeof updateSubscription>

export const removeSubscription = z.object({
  definitely: z.boolean().default(false).optional(),
})
export type removeSubscriptionType = z.infer<typeof removeSubscription>
