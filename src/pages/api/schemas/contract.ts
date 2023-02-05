import { boolean, number, object, string, TypeOf } from 'yup'

export const contractSchema = object({
  userEmail: string().required().email().max(200),
  serviceCode: string().required().max(25),
  isActive: boolean().optional().default(true),
  contractCode: string().optional(),
  description: string().optional(),
  contractPrice: number().required().positive(),
  discountPercentage: number().optional().positive(),
  discountAmount: number().optional().positive(),
  totalPrice: number().optional().positive(),
  payday: number().required().positive(),
  paymentMethod: string().required(),
  paymentAmount: number().required().positive(),
  firstPrice: number().required().positive(),
  recurrencePayment: boolean().default(true),
  recurrence: string().optional(),
  status: string().required().max(25),
  statusNote: string().optional()
})

export type Contract = TypeOf<typeof contractSchema>
