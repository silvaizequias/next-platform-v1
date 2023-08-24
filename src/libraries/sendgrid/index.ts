import * as sendgrid from '@sendgrid/mail'
import { SendGridProps } from './types'

export const SendEmail = async (props: SendGridProps) => {
  const { sendTo, fromEmail, subjectMessage, textMessage } = props
  const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string
  try {
    sendgrid.setApiKey(SENDGRID_API_KEY)
    await sendgrid.send({
      to: sendTo,
      from: fromEmail,
      subject: subjectMessage,
      text: textMessage,
      html: `<span>${textMessage}</span>`,
    })
  } catch (error: any) {
    console.error(error)
    return new Error(error)
  }
}
