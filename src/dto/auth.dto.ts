import * as z from 'zod'

export const AuthSignInDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
})
export type AuthSignInDTOType = z.infer<typeof AuthSignInDTO>

export const AuthSignUpDTO = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
  password: z.string().min(8).max(25).optional(),
})
export type AuthSignUpDTOType = z.infer<typeof AuthSignUpDTO>

export const AuthPasswordResetDTO = z.object({
  email: z.string().email(),
  phone: z.string().length(11),
})
export type AuthPasswordResetDTOType = z.infer<typeof AuthPasswordResetDTO>
