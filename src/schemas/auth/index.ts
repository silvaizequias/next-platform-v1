import * as yup from 'yup'

export const AuthSignInSchema = yup.object().shape({
  phone: yup.string().length(11),
  password: yup.string().min(8).max(25),
})

export type AuthSignInSchemaType = yup.InferType<typeof AuthSignInSchema>

export const AuthSignUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().length(11),
})

export type AuthSignUpSchemaType = yup.InferType<typeof AuthSignUpSchema>

export const AuthResetPassword = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().length(11),
})

export type AuthResetPasswordType = yup.InferType<typeof AuthResetPassword>
