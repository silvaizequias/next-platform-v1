import * as z from 'zod'

export const CreateSubscriptionDTO = z.object({
  code: z.string(),
  customerId: z.string().optional(),
  subscriptionId: z.string().optional(),
  document: z.string(),
  status: z.string().optional(),
  recurrence: z.string().optional(),
  currentPeriodEnd: z.coerce.date().optional(),
  spendLimit: z.coerce.number().optional(),
  spending: z.coerce.number().optional(),
  spendExceeded: z.boolean().optional(),
  price: z.coerce.number().optional(),
  priceId: z.string().optional(),
})
export type CreateSubscriptionDTOType = z.infer<typeof CreateSubscriptionDTO>

export const UpdateSubscriptionDTO = z.object({
  customerId: z.string().optional(),
  subscriptionId: z.string().optional(),
  status: z.string().optional(),
  recurrence: z.string().optional(),
  currentPeriodEnd: z.coerce.date().optional(),
  spendLimit: z.coerce.number().optional(),
  spending: z.coerce.number().optional(),
  spendExceeded: z.boolean().optional(),
  price: z.coerce.number().optional(),
  priceId: z.string().optional(),
})
export type UpdateSubscriptionDTOType = z.infer<typeof UpdateSubscriptionDTO>
