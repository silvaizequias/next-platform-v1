import * as yup from 'yup'

export const SendGridEmailSchema = yup
  .object()
  .shape({
    sendTo: yup.string().email().required(),
    fromEmail: yup.string().email().required(),
    subjectMessage: yup.string().max(50).required(),
    textMessage: yup.string().required(),
  })
  .required()

export type SendGridEmailSchemaType = yup.InferType<typeof SendGridEmailSchema>
