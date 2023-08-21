import * as yup from 'yup'

export const UserCreateSchema = yup.object({
  isVerified: yup.boolean().default(false),
  isActive: yup.boolean().default(false),
  role: yup.mixed().oneOf(['MASTER', 'MEMBER', 'CUSTOMER', 'GUEST']),
  avatar: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string().length(11),
  docType: yup.mixed().oneOf(['MASTER', 'MEMBER', 'CUSTOMER', 'GUEST']),
  docCode: yup.string(),
  zipCode: yup.string().length(8),
  street: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  zone: yup.string(),
  district: yup.string(),
  city: yup.string(),
  state: yup.string(),
})

export type UserCreateSchemaType = yup.InferType<typeof UserCreateSchema>

export const UserUpdateSchema = yup.object({
  isVerified: yup.boolean().default(false).optional(),
  isActive: yup.boolean().default(false).optional(),
  role: yup.mixed().oneOf(['MASTER', 'MEMBER', 'CUSTOMER', 'GUEST']).optional(),
  avatar: yup.string().optional(),
  name: yup.string().optional(),
  email: yup.string().email().optional(),
  phone: yup.string().length(11).optional(),
  docType: yup.mixed().oneOf(['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT']).optional(),
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

export type UserUpdateSchemaType = yup.InferType<typeof UserUpdateSchema>
