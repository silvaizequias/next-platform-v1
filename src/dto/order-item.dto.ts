import * as z from 'zod'

export const OrderItemCreateDTO = z.object({
  orderCode: z.string().optional(),
  code: z.string(),
  note: z.string().optional(),
  amount: z.coerce.number().optional(),
  file: z.string().optional(),
})
export type OrderItemCreateDTOType = z.infer<typeof OrderItemCreateDTO>

export const OrderItemUpdateDTO = z.object({
  orderCode: z.string().optional(),
  note: z.string().optional(),
  amount: z.coerce.number().optional(),
  file: z.string().optional(),
})
export type OrderItemUpdateDTOType = z.infer<typeof OrderItemUpdateDTO>
