import * as z from 'zod'

export const ContractCreateSchema = z.object({})

export type ContractCreateSchemaType = z.infer<
  typeof ContractCreateSchema
>

export const ContractUpdateSchema = z.object({})

export type ContractUpdateSchemaType = z.infer<
  typeof ContractUpdateSchema
>
