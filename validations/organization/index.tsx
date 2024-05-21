import { PHONE_CODE_COUNTRIES } from '@/helpers'
import * as z from 'zod'

export const CreateOrganizationValidation = z.object({
  name: z.string().min(4, { message: 'informe o nome da empresa' }),
  email: z.string().email({ message: 'informe um e-mail válido' }),
  phoneCountry: z.enum(PHONE_CODE_COUNTRIES).optional(),
  phone: z
    .string()
    .min(10, { message: 'o telefone precisa ter no mínimo 10 números' })
    .max(12, {
      message: 'o telefone precisa ter no máximo 12 números com o prefixo',
    }),
  document: z
    .string()
    .length(14, { message: 'o documento precisa ser o número do CNPJ' }),
  zipCode: z
    .string()
    .length(8, { message: 'o cep precisa ser de 8 números' })
    .optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type CreateOrganizationValidationType = z.infer<
  typeof CreateOrganizationValidation
>

export const UpdateOrganizationValidation = z.object({
  active: z.boolean().optional(),
  name: z.string().min(4, { message: 'informe o nome da empresa' }).optional(),
  image: z.string().optional(),
  email: z.string().email({ message: 'informe um e-mail válido' }).optional(),
  phone: z
    .string()
    .min(10, { message: 'o telefone precisa ter no mínimo 10 números' })
    .max(12, {
      message: 'o telefone precisa ter no máximo 12 números com o prefixo',
    })
    .readonly()
    .optional(),
  document: z
    .string()
    .length(14, { message: 'o documento precisa ser o número do CNPJ' })
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
export type UpdateOrganizationValidationType = z.infer<
  typeof UpdateOrganizationValidation
>
