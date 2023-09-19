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

export const SchemaCreateUsersAndServices = z.object({
  userId: z.string(),
  serviceId: z.string(),
  isActive: z.boolean().default(true).optional(),
  role: z.enum(ROLE),
})

export type SchemaCreateUsersAndServicesType = z.infer<
  typeof SchemaCreateUsersAndServices
>

export const SchemaUpdateUsersAndServices = z.object({
  userId: z.string().optional(),
  serviceId: z.string().optional(),
  isActive: z.boolean().optional(),
  role: z.enum(ROLE).optional(),
})

export type SchemaUpdateUsersAndServicesType = z.infer<
  typeof SchemaUpdateUsersAndServices
>
