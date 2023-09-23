import twilio from 'twilio'
import { TwilioProps } from './types'

export const SendSMS = async (props: TwilioProps) => {
  const { sendTo, fromPhone, messageBody } = props
  const TWILIO_ACCOUNT_SID = process.env
    .NEXT_PUBLIC_TWILIO_ACCOUNT_SID as string
  const TWILIO_AUTH_TOKEN = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN as string
  const NEXT_PUBLIC_TWILIO_PHONE_NUMBER = process.env
    .NEXT_PUBLIC_TWILIO_PHONE_NUMBER as string

  try {
    const send = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    await send.messages.create({
      body: messageBody,
      to: '+55' + sendTo,
      from: fromPhone || NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
    })
  } catch (error: any) {
    return new Error(error)
  }
}
