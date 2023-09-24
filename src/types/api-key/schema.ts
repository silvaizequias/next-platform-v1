import * as z from 'zod'

export const ApiKeyCreateScheme = z.object({
  userPhone: z.string().length(11).optional(),
  solutionUrl: z.string().url().optional(),
  expireIn: z.coerce.date().optional(),
  isActive: z.boolean().default(true).optional(),
  description: z.string(),
  secret: z.string().optional(),
  dailyRequestLimit: z.coerce.number().positive(),
  monthlyRequestLimit: z.coerce.number().positive(),
})
export type ApiKeyCreateSchemeType = z.infer<typeof ApiKeyCreateScheme>

export const ApiKeyUpdateScheme = z.object({
  userPhone: z.string().length(11).optional(),
  solutionUrl: z.string().url().optional(),
  expireIn: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  description: z.string().optional(),
  secret: z.string().optional(),
  dailyRequestLimit: z.coerce.number().positive().optional(),
  dailyRequests: z.coerce.number().positive().optional(),
  monthlyRequestLimit: z.coerce.number().positive().optional(),
  monthlyRequests: z.coerce.number().positive().optional(),
})
export type ApiKeyUpdateSchemeType = z.infer<typeof ApiKeyUpdateScheme>
