import * as z from 'zod'

const STATUS = ['ACTIVE', 'SUSPENDED', 'FINISHED', 'CANCELED'] as const
const PERIOD = ['MONTHLY', 'QUARTERLY', 'SEMESTERLY', 'YEARLY'] as const
const PAYMENT = ['CARD', 'ORDER', 'PIX'] as const

export const ContractCreateSchema = z.object({
  userPhone: z.string().length(11).optional(),
  serviceCode: z.string().optional(),
  contractCode: z.string(),
  status: z.enum(STATUS).default('ACTIVE').optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  startedIn: z.coerce.date().default(new Date()).optional(),
  period: z.enum(PERIOD).default('MONTHLY').optional(),
  endedIn: z.coerce.date().optional(),
  payment: z.enum(PAYMENT).default('PIX').optional(),
  discount: z.coerce.number().default(0).optional(),
})

export type ContractCreateSchemaType = z.infer<typeof ContractCreateSchema>

export const ContractUpdateSchema = z
  .object({
    status: z.enum(STATUS).optional(),
    description: z.string().optional(),
    note: z.string().optional(),
    startedIn: z.coerce.date().optional(),
    period: z.enum(PERIOD).optional(),
    endedIn: z.coerce.date().optional(),
    payment: z.enum(PAYMENT).optional(),
    discount: z.coerce.number().default(0),
  })

export type ContractUpdateSchemaType = z.infer<typeof ContractUpdateSchema>
