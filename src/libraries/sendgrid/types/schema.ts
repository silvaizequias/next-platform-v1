import * as z from 'zod'

export const SendGridEmailSchema = z.object({
  sendTo: z.string().email(),
  fromEmail: z.string().email().optional(),
  subjectMessage: z.string().max(100),
  textMessage: z.string(),
})

export type SendGridEmailSchemaType = z.infer<typeof SendGridEmailSchema>
