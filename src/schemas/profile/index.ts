import * as yup from 'yup'

export const ProfileUpdateSchema = yup.object({})

export type ProfileUpdateSchemaType = yup.InferType<typeof ProfileUpdateSchema>
