import * as z from 'zod'

export const CreateAttachmentValidation = z.object({
  orderCode: z.string().optional(),
  code: z.string().optional(),
  note: z.string(),
  file: z.string().optional(),
})
export type CreateAttachmentValidationType = z.infer<typeof CreateAttachmentValidation>

export const UpdateAttachmentValidation = z.object({
  note: z.string().optional(),
  file: z.string().optional(),
})
export type UpdateAttachmentValidationType = z.infer<typeof UpdateAttachmentValidation>