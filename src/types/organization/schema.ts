import * as z from 'zod'

export const OrganizationCreateSchema = z.object({})

export type OrganizationCreateSchemaType = z.infer<
  typeof OrganizationCreateSchema
>

export const OrganizationUpdateSchema = z.object({})

export type OrganizationUpdateSchemaType = z.infer<
  typeof OrganizationUpdateSchema
>
