import * as z from 'zod'

export const CreateNoteSchema = z.object({
  orderCode: z.string().optional(),
  content: z.string(),
  member: z.string().optional(),
  customer: z.string().optional(),
})
export type CreateNoteSchemaType = z.infer<typeof CreateNoteSchema>

export const UpdateNoteSchema = z.object({
  content: z.string().optional(),
  member: z.string().optional(),
  customer: z.string().optional(),
})
export type UpdateNoteSchemaType = z.infer<typeof UpdateNoteSchema>