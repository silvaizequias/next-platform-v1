import * as z from 'zod'

export const LoginValidator = z.object({
  phone: z
    .string({ message: 'este campo é obrigatório' })
    .min(11, { message: 'precisa conter 55 + DDD + celular' })
    .max(13, { message: 'precisa conter 55 + DDD + celular' }),
  code: z
    .string({ message: 'este campo é obrigatório' })
    .length(6, { message: 'recisa conter 6 caracteres' }),
})
export type LoginValidatorType = z.infer<typeof LoginValidator>

export const PhoneValidator = z.object({
  phone: z
    .string({ message: 'este campo é obrigatório' })
    .min(11, { message: 'precisa conter 55 + DDD + celular' })
    .max(13, { message: 'precisa conter 55 + DDD + celular' }),
})
export type PhoneValidatorType = z.infer<typeof PhoneValidator>
