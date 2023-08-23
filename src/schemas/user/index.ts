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
  avatar: yup.string().default(''),
  name: yup.string().default(''),
  email: yup.string().default('').email(),
  phone: yup.string().default(''),
  docType: yup
    .mixed()
    .oneOf(['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'])
    .default('CPF'),
  docCode: yup.string().default(''),
  zipCode: yup.string().default(''),
  street: yup.string().default(''),
  number: yup.string().default(''),
  complement: yup.string().default(''),
  zone: yup.string().default(''),
  district: yup.string().default(''),
  city: yup.string().default(''),
  state: yup.string().default(''),
})

export type UserUpdateSchemaType = yup.InferType<typeof UserUpdateSchema>

export const UserPasswordUpdateSchema = yup.object().shape({
  password: yup.string().min(8).max(25).required(),
})

export type UserPasswordUpdateSchemaType = yup.InferType<
  typeof UserPasswordUpdateSchema
>
