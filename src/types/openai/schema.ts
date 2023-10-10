import * as z from 'zod'

const MODEL = [
  'babbage-002',
  'davinci-002',
  'gpt-4',
  'gpt-4-0314',
  'gpt-4-0613',
  'gpt-4-32k',
  'gpt-4-32k-0314',
  'gpt-4-32k-0613',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-16k-0613',
  'text-davinci-003',
  'text-davinci-002',
  'text-davinci-001',
  'code-davinci-002',
  'text-curie-001',
  'text-babbage-001',
  'text-ada-001',
] as const

export const OpenAiSchema = z.object({
  content: z.string().min(10),
  model: z.enum(MODEL).optional(),
})
export type OpenAiSchemaType = z.infer<typeof OpenAiSchema>
