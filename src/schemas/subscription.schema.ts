import * as z from 'zod'

export const Schema = z.object({})
export type SchemaType = z.infer<typeof Schema>