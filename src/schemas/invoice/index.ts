import * as yup from 'yup'

export const InvoiceCreateSchema = yup.object().shape({
  contractCode: yup.string().required(),
  invoiceCode: yup.string().required(),
  barCode: yup.string().optional(),
  qrCode: yup.string().optional(),
  status: yup.mixed().oneOf(['PENDING', 'INVOICED', 'CANCELED']).required(),
  description: yup.string().optional(),
  note: yup.string().optional(),
  tax: yup.number().default(0).optional(),
  amount: yup.number().positive().default(0).optional(),
  payUpTo: yup.date().optional(),
  wasPaid: yup.boolean().default(false).optional(),
  paidAt: yup.date().optional(),
})

export type InvoiceCreateSchemaType = yup.InferType<typeof InvoiceCreateSchema>

export const InvoiceUpdateSchema = yup.object().shape({
  barCode: yup.string().default(''),
  qrCode: yup.string().default(''),
  status: yup.string().default(''),
  description: yup.string().default(''),
  note: yup.string().default(''),
  tax: yup.number().default(0),
  amount: yup.number().positive().default(0),
  payUpTo: yup.date().optional(),
  wasPaid: yup.boolean().default(false),
  paidAt: yup.date().optional(),
})

export type InvoiceUpdateSchemaType = yup.InferType<typeof InvoiceUpdateSchema>
