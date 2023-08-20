import * as yup from 'yup'

export const UserCreateSchema = yup.object({})

export type UserCreateSchemaType = yup.InferType<typeof UserCreateSchema>

export const UserUpdateSchema = yup.object({})

export type UserUpdateSchemaType = yup.InferType<typeof UserUpdateSchema>
