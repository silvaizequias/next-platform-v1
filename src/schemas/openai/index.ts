import * as z from 'zod'

export const OpenAiCompletionSchema = z.object({
  content: z.string().min(10),
  maxTokens: z.number().positive().max(100),
})

export type OpenAiCompletionSchemaType = z.infer<typeof OpenAiCompletionSchema>

export const OpenAiStreamSchema = z.object({
  content: z.string().min(10),
  stream: z.boolean(),
})

export type OpenAiStreamSchemaType = z.infer<typeof OpenAiStreamSchema>
