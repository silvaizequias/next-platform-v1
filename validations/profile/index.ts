import * as z from 'zod'

export const ProfileUpdateValidation = z.object({
  available: z.boolean().optional(),
  name: z.string().min(5, { message: 'infomre seu nome completo' }),
  email: z.string().email({ message: 'informe um e-mail válido' }),
  document: z
    .string()
    .min(11, { message: 'o documento precisa ser o número do CPF ou CNPJ' })
    .max(14, { message: 'o documento precisa ser o número do CPF ou CNPJ' }),
  phone: z
    .string()
    .min(10, { message: 'o telefone precisa ter no mínimo 10 números' })
    .max(14, {
      message: 'o telefone precisa ter no máximo 14 números com o prefixo',
    }).optional(),
})
export type ProfileUpdateValidationType = z.infer<
  typeof ProfileUpdateValidation
>

export const ProfileAvaiableValidation = z.object({
  available: z.boolean(),
})
export type ProfileAvaiableValidationType = z.infer<
  typeof ProfileAvaiableValidation
>

export const ProfileLocationUpdateValidation = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})
export type ProfileLocationUpdateValidationType = z.infer<
  typeof ProfileLocationUpdateValidation
>

export const ProfilePasswordUpdateValidation = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'a senha precisa ter no mínimo 8 caracteres' })
      .max(25, { message: 'a senha precisa ter no máximo 25 caracteres' }),
    confirmNewPassword: z
      .string()
      .min(8, { message: 'a senha precisa ter no mínimo 8 caracteres' })
      .max(25, { message: 'a senha precisa ter no máximo 25 caracteres' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'é diferente da nova senha',
    path: ['confirmNewPassword'],
  })
export type ProfilePasswordUpdateValidationType = z.infer<
  typeof ProfilePasswordUpdateValidation
>
