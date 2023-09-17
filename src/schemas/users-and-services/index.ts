import * as z from 'zod'

export const SchemaCreateUsersAndServices = z.object({
  userId: z.string(),
  serviceId: z.string(),
})

export type SchemaCreateUsersAndServicesType = z.infer<
  typeof SchemaCreateUsersAndServices
>

export const SchemaUpdateUsersAndServices = z.object({
  userId: z.string().optional(),
  serviceId: z.string().optional(),
})

export type SchemaUpdateUsersAndServicesType = z.infer<
  typeof SchemaUpdateUsersAndServices
>
