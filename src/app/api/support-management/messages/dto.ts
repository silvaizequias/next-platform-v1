import * as z from 'zod'

export const CreateSupportMessageDTO = z.object({
  ticketId: z.string().optional(),
  to: z.string(),
  content: z.string(),
  read: z.boolean().optional(),
  solved: z.boolean().optional(),
})
export type CreateSupportMessageDTOType = z.infer<
  typeof CreateSupportMessageDTO
>

export const UpdateSupportMessageDTO = z.object({
  ticketId: z.string().optional(),
  to: z.string().optional(),
  content: z.string().optional(),
  read: z.boolean().optional(),
  solved: z.boolean().optional(),
})
export type UpdateSupportMessageDTOType = z.infer<
  typeof UpdateSupportMessageDTO
>
