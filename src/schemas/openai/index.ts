import * as yup from 'yup'

export const OpenAiCompletionSchema = yup
  .object()
  .shape({
    content: yup.string().min(10).required(),
    maxTokens: yup.number().positive().max(30).required(),
  })
  .required()

export type OpenAiCompletionSchemaType = yup.InferType<
  typeof OpenAiCompletionSchema
>

export const OpenAiStreamSchema = yup
  .object()
  .shape({
    content: yup.string().min(10).required(),
    stream: yup.boolean().required(),
  })
  .required()

export type OpenAiStreamSchemaType = yup.InferType<typeof OpenAiStreamSchema>
