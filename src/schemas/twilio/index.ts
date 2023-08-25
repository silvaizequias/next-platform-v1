import * as z from 'zod'

export const TwilioSMSSchema = z.object({
  messageBody: z.string().min(10).max(250),
  sendTo: z.string().min(11).max(14),
  fromPhone: z.string().min(11).max(14),
})

export type TwilioSMSSchemaType = z.infer<typeof TwilioSMSSchema>
