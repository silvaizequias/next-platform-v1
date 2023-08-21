import * as yup from 'yup'

export const ProfileUpdateSchema = yup.object({
  avatar: yup.string().optional(),
  name: yup.string().optional(),
  email: yup.string().email().optional(),
  phone: yup.string().length(11).optional(),
  docType: yup
    .mixed()
    .oneOf(['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'])
    .optional(),
  docCode: yup.string().optional(),
  zipCode: yup.string().length(8).optional(),
  street: yup.string().optional(),
  number: yup.string().optional(),
  complement: yup.string().optional(),
  zone: yup.string().optional(),
  district: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
})

export type ProfileUpdateSchemaType = yup.InferType<typeof ProfileUpdateSchema>
