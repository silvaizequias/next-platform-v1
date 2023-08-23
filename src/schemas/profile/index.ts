import * as yup from 'yup'

export const ProfileUpdateSchema = yup.object().shape({
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

export type ProfileUpdateSchemaType = yup.InferType<typeof ProfileUpdateSchema>

export const ProfilePasswordUpdateSchema = yup.object().shape({
  oldPassword: yup.string().min(8).max(25).required(),
  password: yup.string().min(8).max(25).required(),
})

export type ProfilePasswordUpdateSchemaType = yup.InferType<
  typeof ProfilePasswordUpdateSchema
>
