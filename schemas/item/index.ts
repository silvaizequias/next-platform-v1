import * as z from 'zod'

export const CreateItemSchema = z.object({
  orderCode: z.string().optional(),
  code: z.string().optional(),
  note: z.string(),
  amount: z.coerce.number().positive().optional(),
  file: z.string().optional(),
})
export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>

export const UpdateItemSchema = z.object({
  note: z.string().optional(),
  amount: z.coerce.number().positive().optional(),
  file: z.string().optional(),
})
export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>