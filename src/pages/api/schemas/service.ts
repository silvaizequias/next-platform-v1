import { number, object, string, TypeOf } from 'yup'

export const serviceSchema = object({
  serviceCode: string().optional(),
  title: string().required().max(25),
  description: string().optional(),
  servicePrice: number().required().positive()
})

export type Service = TypeOf<typeof serviceSchema>
