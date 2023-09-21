import * as z from 'zod'

export const OrganizationSolutionCreateSchema = z.object({
  solutionId: z.string(),
  organizationId: z.string(),
  isActive: z.boolean().default(true).optional(),
})

export type OrganizationSolutionCreateSchemaType = z.infer<
  typeof OrganizationSolutionCreateSchema
>

export const OrganizationSolutionUpdateSchema = z.object({
  solutionId: z.string(),
  organizationId: z.string(),
  isActive: z.boolean().default(true).optional(),
})

export type OrganizationSolutionUpdateSchemaType = z.infer<
  typeof OrganizationSolutionUpdateSchema
>
