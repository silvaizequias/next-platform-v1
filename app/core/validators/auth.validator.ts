import * as z from 'zod'

export const authLogin = z.object({
  phone: z
    .string({ message: 'este campo é obrigatório' })
    .min(11, { message: 'precisa conter 55 + DDD + celular' })
    .max(13, { message: 'precisa conter 55 + DDD + celular' }),

  code: z
    .string({ message: 'este campo é obrigatório' })
    .length(6, { message: 'precisa conter 6 dígitos' })
    .transform((code) => code.toUpperCase()),
})
export type authLoginType = z.infer<typeof authLogin>

export const authCode = z.object({
  phone: z
    .string({ message: 'este campo é obrigatório' })
    .min(11, { message: 'precisa conter 55 + DDD + celular' })
    .max(13, { message: 'precisa conter 55 + DDD + celular' }),
})
export type authCodeType = z.infer<typeof authCode>

const payload = z.object({
  expiresIn: z.coerce.number(),
  id: z.string(),
  token: z.string(),
})
export type authPayload = z.infer<typeof payload>
