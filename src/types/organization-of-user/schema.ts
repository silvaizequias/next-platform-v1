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

export const UserOrganizationCreateSchema = z.object({
  organizationCnpj: z.string().length(14).optional(),
  userPhone: z.string().length(11).optional(),
  role: z.enum(ROLE),
  isAvaliable: z.boolean(),
})

export type UserOrganizationCreateSchemaType = z.infer<
  typeof UserOrganizationCreateSchema
>

export const UserOrganizationUpdateSchema = z.object({
  organizationCnpj: z.string().length(14).optional(),
  userPhone: z.string().length(11).optional(),
  role: z.enum(ROLE).default('USER').optional(),
  isAvaliable: z.boolean().default(true).optional(),
})

export type UserOrganizationUpdateSchemaType = z.infer<
  typeof UserOrganizationUpdateSchema
>
