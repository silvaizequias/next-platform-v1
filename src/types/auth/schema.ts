import * as z from 'zod'

export const SignInSchema = z.object({
  phone: z.string().length(11),
  password: z.string().min(8).max(24),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  name: z.string(),
  phone: z.string().length(11),
  email: z.string().email(),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>

export const ResetPasswordSchema = z.object({
  phone: z.string().length(11),
  email: z.string().email(),
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
