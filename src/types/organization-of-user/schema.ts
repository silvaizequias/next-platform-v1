import * as z from 'zod'

const ROLE = [
  'ADMINISTRATOR',
  'MANAGER',
  'SUPERVISOR',
  'ANALYST',
  'INSTRUCTOR',
  'TECHNICIAN',
  'DRIVER',
  'USER',
] as const

export const UserOrganizationCreateSchema = z.object({})

export type UserOrganizationCreateSchemaType = z.infer<
  typeof UserOrganizationCreateSchema
>

export const UserOrganizationUpdateSchema = z.object({})

export type UserOrganizationUpdateSchemaType = z.infer<
  typeof UserOrganizationUpdateSchema
>
