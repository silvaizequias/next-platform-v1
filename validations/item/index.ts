import * as z from 'zod'

export const CreateItemValidation = z.object({
  orderCode: z.string().optional(),
  code: z.string().optional(),
  note: z.string(),
  amount: z.coerce.number().positive().optional(),
  file: z.string().optional(),
})
export type CreateItemValidationType = z.infer<typeof CreateItemValidation>

export const UpdateItemValidation = z.object({
  note: z.string().optional(),
  amount: z.coerce.number().positive().optional(),
  file: z.string().optional(),
})
export type UpdateItemValidationType = z.infer<typeof UpdateItemValidation>
