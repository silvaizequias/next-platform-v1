import * as z from 'zod'

export const SenderEmailValidator = z.object({
  to: z.string(),
  bcc: z.string().optional(),
  subject: z.string(),
  message: z.string(),
})
export type SenderEmailValidatorType = z.infer<typeof SenderEmailValidator>

export const SenderSMSValidator = z.object({
  to: z.string(),
  message: z.string(),
})
export type SenderSMSValidatorType = z.infer<typeof SenderSMSValidator>
