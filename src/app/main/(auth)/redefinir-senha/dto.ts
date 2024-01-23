import * as z from 'zod'

export const ResetPasswordDTO = z.object({
  phone: z.string().min(10).max(14),
})
export type ResetPasswordDTOType = z.infer<typeof ResetPasswordDTO>

export const ResetPasswordCodeDTO = z.object({
  accessCode: z.string().length(6),
})
export type ResetPasswordCodeDTOType = z.infer<typeof ResetPasswordCodeDTO>
