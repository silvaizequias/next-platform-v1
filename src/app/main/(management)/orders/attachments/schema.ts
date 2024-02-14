import * as z from 'zod'

export const CreateOrderAttachmentSchema = z.object({
  orderCode: z.string(),
  code: z.string().optional(),
  note: z.string(),
  file: z.string().optional(),
})
export type CreateOrderAttachmentSchemaType = z.infer<
  typeof CreateOrderAttachmentSchema
>

export const UpdateOrderAttachmentSchema = z.object({
  note: z.string().optional(),
  file: z.string().optional(),
})
export type UpdateOrderAttachmentSchemaType = z.infer<
  typeof UpdateOrderAttachmentSchema
>
