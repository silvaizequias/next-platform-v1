import { SUBSCRIPTION_PAYMENT_GATEWAY } from '@/helpers'
import * as z from 'zod'

export const CreateSubscriptionValidation = z.object({
  organizationDocument: z
    .string()
    .length(14, { message: 'o documento precisa ser o número do CNPJ' })
    .optional(),
  paymentGateway: z
    .enum(SUBSCRIPTION_PAYMENT_GATEWAY)
    .default('stripe')
    .optional(),
  paymentCustomerId: z.string().optional(),
  paymentSubscriptionId: z.string().optional(),
  paymentPriceId: z.string().optional(),
  credit: z.coerce.number().optional(),
  unlimited: z.boolean(),
})
export type CreateSubscriptionValidationType = z.infer<
  typeof CreateSubscriptionValidation
>

export const UpdateSubscriptionValidation = z.object({
  organizationDocument: z
    .string()
    .length(14, { message: 'o documento precisa ser o número do CNPJ' })
    .optional(),
  paymentCustomerId: z.string().optional(),
  paymentSubscriptionId: z.string().optional(),
  paymentPriceId: z.string().optional(),
  credit: z.coerce.number().optional(),
  unlimited: z.boolean(),
})
export type UpdateSubscriptionValidationType = z.infer<
  typeof UpdateSubscriptionValidation
>

export const CheckoutSubscriptionValidation = z.object({
  credit: z.coerce.number().min(100),
  document: z
    .string()
    .min(11, { message: 'o documento precisa ser um CPF ou CNPJ' })
    .max(14, { message: 'o documento precisa ser um CPF ou CNPJ' }),
  url: z.string().default(`${process.env.NEXTAUTH_URL}`),
})
export type CheckoutSubscriptionValidationType = z.infer<
  typeof CheckoutSubscriptionValidation
>
