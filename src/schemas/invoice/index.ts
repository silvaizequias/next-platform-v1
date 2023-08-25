import * as z from 'zod'

const STATUS = ['PENDING', 'INVOICED', 'CANCELED'] as const

export const InvoiceCreateSchema = z.object({
  contractCode: z.string().optional(),
  invoiceCode: z.string(),
  barCode: z.string().optional(),
  qrCode: z.string().optional(),
  status: z.enum(STATUS),
  description: z.string().optional(),
  note: z.string().optional(),
  tax: z.number().default(0),
  amount: z.number().positive().default(0),
  payUpTo: z.coerce.date(),
})

export type InvoiceCreateSchemaType = z.infer<typeof InvoiceCreateSchema>

export const InvoiceUpdateSchema = z.object({
  barCode: z.string().optional(),
  qrCode: z.string().optional(),
  status: z.enum(STATUS).optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  tax: z.number().default(0),
  amount: z.number().positive().default(0),
  payUpTo: z.coerce.date().optional(),
  wasPaid: z.boolean().default(false),
  paidAt: z.coerce.date().optional(),
})

export type InvoiceUpdateSchemaType = z.infer<typeof InvoiceUpdateSchema>
