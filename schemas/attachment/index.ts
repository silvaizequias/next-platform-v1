import * as z from 'zod'

export const CreateAttachmentSchema = z.object({
  orderCode: z.string().optional(),
  code: z.string().optional(),
  note: z.string(),
  file: z.string().optional(),
})
export type CreateAttachmentSchemaType = z.infer<typeof CreateAttachmentSchema>

export const UpdateAttachmentSchema = z.object({
  note: z.string().optional(),
  file: z.string().optional(),
})
export type UpdateAttachmentSchemaType = z.infer<typeof UpdateAttachmentSchema>