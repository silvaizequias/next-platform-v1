import * as z from 'zod'

export const CreateServiceItemDTO = z.object({
  orderId: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
  amount: z.coerce.number().optional(),
  file: z.string().optional(),
})
export type CreateServiceItemDTOType = z.infer<typeof CreateServiceItemDTO>

export const UpdateServiceItemDTO = z.object({
  orderId: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
  amount: z.coerce.number().optional(),
  file: z.string().optional(),
})
export type UpdateServiceItemDTOType = z.infer<typeof UpdateServiceItemDTO>
