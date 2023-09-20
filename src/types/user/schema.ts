import * as z from 'zod'

const PROFILE = ['MASTER', 'OWNER', 'MEMBER', 'CUSTOMER', 'GUEST'] as const

export const UserCreateSchema = z.object({})

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = z.object({})

export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>
