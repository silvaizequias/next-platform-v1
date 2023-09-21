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
  organizationId: z.string(),
  userId: z.string(),
  role: z.enum(ROLE).default('USER').optional(),
  isAvaliable: z.boolean().default(true).optional(),
})

export type UserOrganizationCreateSchemaType = z.infer<
  typeof UserOrganizationCreateSchema
>

export const UserOrganizationUpdateSchema = z.object({
  organizationId: z.string().optional(),
  userId: z.string().optional(),
  role: z.enum(ROLE).default('USER').optional(),
  isAvaliable: z.boolean().default(true).optional(),
})

export type UserOrganizationUpdateSchemaType = z.infer<
  typeof UserOrganizationUpdateSchema
>
