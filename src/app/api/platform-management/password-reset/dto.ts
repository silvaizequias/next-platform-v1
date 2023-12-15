import * as z from 'zod'

export const PasswordResetDTO = z.object({
  email: z.string().email(),
  phone: z.string().length(11),
})
export type PasswordResetDTOType = z.infer<typeof PasswordResetDTO>
