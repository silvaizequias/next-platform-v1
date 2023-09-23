import * as sendgrid from '@sendgrid/mail'
import { SendGridProps } from './types'

export const SendEmail = async (props: SendGridProps): Promise<any> => {
  const { sendTo, fromEmail, subjectMessage, textMessage } = props
  const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string
  const NEXT_PUBLIC_SENDGRID_FROM_EMAIL = process.env
    .NEXT_PUBLIC_SENDGRID_FROM_EMAIL as string
  try {
    sendgrid.setApiKey(SENDGRID_API_KEY)
    await sendgrid.send({
      to: sendTo,
      from: {
        email: fromEmail || NEXT_PUBLIC_SENDGRID_FROM_EMAIL,
        name: 'Dedicado Digital',
      },
      subject: subjectMessage,
      text: textMessage,
      html: textMessage,
    })
  } catch (error: any) {
    console.error(error)
    return new Error(error)
  }
}
