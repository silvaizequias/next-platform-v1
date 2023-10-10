import * as z from 'zod'

export const AuthSignInSchema = z.object({
  phone: z.string().length(11),
  password: z.string().min(8).max(24),
})

export type AuthSignInSchemaType = z.infer<typeof AuthSignInSchema>

export const AuthSignUpSchema = z.object({
  name: z.string(),
  phone: z.string().length(11),
  email: z.string().email(),
  password: z.string().min(8).max(25).optional()
})

export type AuthSignUpSchemaType = z.infer<typeof AuthSignUpSchema>

export const AuthResetPasswordSchema = z.object({
  phone: z.string().length(11),
  email: z.string().email(),
})

export type AuthResetPasswordSchemaType = z.infer<typeof AuthResetPasswordSchema>
