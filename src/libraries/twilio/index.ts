import twilio from 'twilio'
import { TwilioProps } from './types'

export const SendSMS = async (props: TwilioProps) => {
  const { sendTo, fromPhone, messageBody } = props
  const TWILIO_ACCOUNT_SID = process.env
    .NEXT_PUBLIC_TWILIO_ACCOUNT_SID as string
  const TWILIO_AUTH_TOKEN = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN as string

  try {
    const send = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    await send.messages.create({
      body: messageBody,
      to: sendTo,
      from: fromPhone,
    })
  } catch (error: any) {
    return new Error(error)
  }
}
