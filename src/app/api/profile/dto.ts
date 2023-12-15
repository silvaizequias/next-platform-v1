import * as z from 'zod'

export const UpdateProfileDTO = z.object({
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(11).optional(),
  documentCode: z.string().optional(),
})
export type UpdateProfileDTOType = z.infer<typeof UpdateProfileDTO>

export const UpdateProfilePasswordDTO = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8).max(25),
    confirmNewPassword: z.string().min(8).max(25),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As confirmação está incorreta',
    path: ['confirmNewPassword'],
  })
export type UpdateProfilePasswordDTOType = z.infer<
  typeof UpdateProfilePasswordDTO
>

export const UpdateProfileAddressDTO = z.object({
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateProfileAddressDTOType = z.infer<
  typeof UpdateProfileAddressDTO
>
