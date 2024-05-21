import * as z from 'zod'

export const CreateNoteValidation = z.object({
  orderCode: z.string().optional(),
  content: z.string(),
  member: z.string().optional(),
  customer: z.string().optional(),
})
export type CreateNoteValidationType = z.infer<typeof CreateNoteValidation>

export const UpdateNoteValidation = z.object({
  content: z.string().optional(),
  member: z.string().optional(),
  customer: z.string().optional(),
})
export type UpdateNoteValidationType = z.infer<typeof UpdateNoteValidation>
