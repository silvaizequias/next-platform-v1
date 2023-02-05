import { boolean, date, number, object, string, TypeOf } from 'yup'

export const invoiceSchema = object({
  userEmail: string().required().email().max(200),
  contractCode: string().required().max(25),
  invoiceCode: string().optional(),
  invoicePrice: number().required().positive(),
  percentageIncrement: number().optional().positive(),
  totalIncrement: number().optional().positive(),
  totalPrice: number().optional().positive(),
  paymentDate: date().required(),
  note: string().optional(),
  status: string().required().max(25),
  statusNote: string().optional()
})

export type Invoice = TypeOf<typeof invoiceSchema>
