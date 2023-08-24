import * as yup from 'yup'

export const TwilioSMS = yup
  .object()
  .shape({
    messageBody: yup.string().min(10).max(250).required(),
    sendTo: yup.string().min(11).max(14).required(),
    fromPhone: yup.string().min(11).max(14).required(),
  })
  .required()

export type TwilioSMSType = yup.InferType<typeof TwilioSMS>
