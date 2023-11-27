import * as z from 'zod'

export const OrderAttachmentCreateDTO = z.object({
  orderCode: z.string().optional(),
  code: z.string(),
  note: z.string().optional(),
  file: z.string().optional(),
})
export type OrderAttachmentCreateDTOType = z.infer<
  typeof OrderAttachmentCreateDTO
>

export const OrderAttachmentUpdateDTO = z.object({
  orderCode: z.string().optional(),
  note: z.string().optional(),
  file: z.string().optional(),
})
export type OrderAttachmentUpdateDTOType = z.infer<
  typeof OrderAttachmentUpdateDTO
>
