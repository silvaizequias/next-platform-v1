import { env } from '@/environments'
import { Twilio } from 'twilio'

export type SendSmsType = {
  to: string
  from: string
  body: string
}

export const sendSms = async (data: SendSmsType) => {
  const twilio = new Twilio(env.TWILIO_ACCOUNT_SID!, env.TWILIO_AUTH_TOKEN!)
  return await twilio.messages.create(data)
}
