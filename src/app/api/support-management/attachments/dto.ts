import * as z from 'zod'

export const CreateSupportAttachmentDTO = z.object({
  ticketId: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
  file: z.string().optional(),
})
export type CreateSupportAttachmentDTOType = z.infer<
  typeof CreateSupportAttachmentDTO
>

export const UpdateSupportAttachmentDTO = z.object({
  ticketId: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
  file: z.string().optional(),
})
export type UpdateSupportAttachmentDTOType = z.infer<
  typeof UpdateSupportAttachmentDTO
>
