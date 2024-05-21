import { PHONE_CODE_COUNTRIES, USER_PROFILE } from '@/helpers'
import * as z from 'zod'

export const UserCreateValidation = z.object({
  available: z.boolean().optional(),
  profile: z.enum(USER_PROFILE),
  name: z.string().min(5, { message: 'infomre seu nome completo' }),
  email: z.string().email({ message: 'informe um e-mail válido' }),
  phoneCountry: z.enum(PHONE_CODE_COUNTRIES).optional(),
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
  document: z
    .string()
    .min(11, { message: 'o documento precisa ser o número do CPF ou CNPJ' })
    .max(14, { message: 'o documento precisa ser o número do CPF ou CNPJ' })
    .optional(),
  zipCode: z
    .string()
    .length(8, { message: 'o cep precisa ser de 8 números' })
    .optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UserCreateValidationType = z.infer<typeof UserCreateValidation>

export const UserUpdateValidation = z.object({
  active: z.boolean().optional(),
  available: z.boolean().optional(),
  profile: z.enum(USER_PROFILE).optional(),
  image: z.string().optional(),
  name: z.string().min(5, { message: 'infomre seu nome completo' }).optional(),
  email: z.string().email({ message: 'informe um e-mail válido' }).optional(),
  phone: z
    .string()
    .min(10, { message: 'o telefone precisa ter no mínimo 10 números' })
    .max(14, {
      message: 'o telefone precisa ter no máximo 14 números com o prefixo',
    })
    .optional(),
  password: z
    .string()
    .min(8, { message: 'a senha precisa ter no mínimo 8 caracteres' })
    .max(25, { message: 'a senha precisa ter no máximo 25 caracteres' })
    .optional(),
  document: z
    .string()
    .min(11, { message: 'o documento precisa ser o número do CPF ou CNPJ' })
    .max(14, { message: 'o documento precisa ser o número do CPF ou CNPJ' })
    .readonly()
    .optional(),
  zipCode: z
    .string()
    .length(8, { message: 'o cep precisa ser de 8 números' })
    .optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UserUpdateValidationType = z.infer<typeof UserUpdateValidation>
