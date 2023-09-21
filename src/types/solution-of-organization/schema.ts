import * as z from 'zod'

export const OrganizationSolutionCreateSchema = z.object({
  solutionUrl: z.string().url().optional(),
  organizationCnpj: z.string().length(14).optional(),
  isActive: z.boolean(),
})

export type OrganizationSolutionCreateSchemaType = z.infer<
  typeof OrganizationSolutionCreateSchema
>

export const OrganizationSolutionUpdateSchema = z.object({
  solutionUrl: z.string().url().optional(),
  organizationCnpj: z.string().length(14).optional(),
  isActive: z.boolean().default(true).optional(),
})

export type OrganizationSolutionUpdateSchemaType = z.infer<
  typeof OrganizationSolutionUpdateSchema
>
