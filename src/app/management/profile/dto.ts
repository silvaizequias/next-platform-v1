import * as z from 'zod'

const DOCUMENT_TYPE = ['cpf', 'cnpj'] as const

export const UpdateProfileDTO = z.object({
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14).optional(),
  documentType: z.enum(DOCUMENT_TYPE).optional(),
  documentCode: z.string().min(11).max(14).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateProfileDTOType = z.infer<typeof UpdateProfileDTO>

export const UpdateProfilePasswordDTO = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8).max(25),
    confirmNewPassword: z.string().min(8).max(25),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'as senhas não coincidem',
    path: ['confirmNewPassword'],
  })
export type UpdateProfilePasswordDTOType = z.infer<
  typeof UpdateProfilePasswordDTO
>
