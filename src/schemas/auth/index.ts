import * as yup from 'yup'

export const AuthSignInSchema = yup.object({})

export type AuthSignInSchemaType = yup.InferType<typeof AuthSignInSchema>

export const AuthSignUpSchema = yup.object({})

export type AuthSignUpSchemaType = yup.InferType<typeof AuthSignUpSchema>

export const AuthResetPassword = yup.object({})

export type AuthResetPasswordType = yup.InferType<typeof AuthResetPassword>
