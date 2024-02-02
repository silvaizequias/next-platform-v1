import * as z from 'zod'

export const CreateOrderDTO = z.object({
  organization: z.string(),
  observation: z.string().optional(),
  customer: z.string(),
  member: z.string().optional(),
  originZipCode: z.string().optional(),
  originComplement: z.string().optional(),
  originLatitude: z.coerce.number().optional(),
  originLongitude: z.coerce.number().optional(),
  destinationZipCode: z.string().optional(),
  destinationComplement: z.string().optional(),
  destinationLatitude: z.coerce.number().optional(),
  destinationLongitude: z.coerce.number().optional(),
  deadline: z.coerce.date().optional(),
})
export type CreateOrderDTOType = z.infer<typeof CreateOrderDTO>

export const UpdateOrderDTO = z.object({
  organization: z.string().optional(),
  observation: z.string().optional(),
  customer: z.string().optional(),
  member: z.string().optional(),
  originZipCode: z.string().optional(),
  originComplement: z.string().optional(),
  originLatitude: z.coerce.number().optional(),
  originLongitude: z.coerce.number().optional(),
  destinationZipCode: z.string().optional(),
  destinationComplement: z.string().optional(),
  destinationLatitude: z.coerce.number().optional(),
  destinationLongitude: z.coerce.number().optional(),
  deadline: z.coerce.date().optional(),
  started: z.boolean().optional(),
  startDate: z.coerce.date().optional(),
  startNote: z.string().optional(),
  completed: z.boolean().optional(),
  completionDate: z.coerce.date().optional(),
  completionNote: z.string().optional(),
  canceled: z.boolean().optional(),
  cancellationDate: z.coerce.date().optional(),
  cancellationNote: z.string().optional(),
})
export type UpdateOrderDTOType = z.infer<typeof UpdateOrderDTO>
