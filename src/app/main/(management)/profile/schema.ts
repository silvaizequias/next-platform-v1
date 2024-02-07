import * as z from 'zod'

export const ProfileUpdateSchema = z.object({})
export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>
