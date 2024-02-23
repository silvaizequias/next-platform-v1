import * as z from 'zod'

export const CreateSubscriptionSchema = z.object({})
export type CreateSubscriptionSchemaType = z.infer<
  typeof CreateSubscriptionSchema
>

export const UpdateSubscriptionSchema = z.object({})
export type UpdateSubscriptionSchemaType = z.infer<
  typeof UpdateSubscriptionSchema
>
