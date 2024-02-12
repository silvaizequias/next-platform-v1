import * as z from 'zod'

export const CreateOrderItemSchema = z.object({
  code: z.string().optional(),
  note: z.string(),
  amount: z.coerce.number().positive().optional(),
  file: z.string().optional(),
})
export type CreateOrderItemSchemaType = z.infer<typeof CreateOrderItemSchema>

export const UpdateOrderItemSchema = z.object({
  note: z.string().optional(),
  amount: z.coerce.number().positive().optional(),
  file: z.string().optional(),
})
export type UpdateOrderItemSchemaType = z.infer<typeof UpdateOrderItemSchema>
