import * as z from 'zod'

export const TwilioSmsSchema = z.object({
  messageBody: z.string().min(10).max(255),
  sendTo: z.string().length(11),
  fromPhone: z.string().min(11).max(14).optional(),
})

export type TwilioSmsSchemaType = z.infer<typeof TwilioSmsSchema>
