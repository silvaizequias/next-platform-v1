import * as z from 'zod'

const STATUS = ['NEW', 'OPENED', 'PENDING', 'SOLVED', 'CLOSED'] as const

export const CreateSupportTicketDTO = z.object({
  categoryId: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(STATUS).default('NEW').optional(),
  organization: z.string(),
  customer: z.string().optional(),
  subject: z.string(),
  content: z.string().optional(),
})
export type CreateSupportTicketDTOType = z.infer<typeof CreateSupportTicketDTO>

export const UpdateSupportTicketDTO = z.object({
  categoryId: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(STATUS).default('NEW').optional(),
  organization: z.string().optional(),
  customer: z.string().optional(),
  subject: z.string().optional(),
  content: z.string().optional(),
})
export type UpdateSupportTicketDTOType = z.infer<typeof UpdateSupportTicketDTO>
