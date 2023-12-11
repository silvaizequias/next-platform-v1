import * as z from 'zod'

export const CreateServiceAttachmentDTO = z.object({
  orderId: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
  file: z.string().optional(),
})
export type CreateServiceAttachmentDTOType = z.infer<
  typeof CreateServiceAttachmentDTO
>

export const UpdateServiceAttachmentDTO = z.object({
  orderId: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
  file: z.string().optional(),
})
export type UpdateServiceAttachmentDTOType = z.infer<
  typeof UpdateServiceAttachmentDTO
>
