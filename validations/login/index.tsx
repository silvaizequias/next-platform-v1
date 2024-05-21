import { PHONE_CODE_COUNTRIES } from '@/helpers'
import * as z from 'zod'

export const LoginValidation = z.object({
  phoneCountry: z.enum(PHONE_CODE_COUNTRIES),
  phone: z
    .string()
    .min(10, { message: 'o telefone precisa ter no mínimo 10 números' })
    .max(12, {
      message: 'o telefone precisa ter no máximo 12 números com o prefixo',
    }),
  password: z
    .string()
    .min(8, { message: 'a senha precisa ter no mínimo 8 caracteres' })
    .max(25, { message: 'a senha precisa ter no máximo 25 caracteres' })
    .optional(),
})
export type LoginValidationType = z.infer<typeof LoginValidation>
