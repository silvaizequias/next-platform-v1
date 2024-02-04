import { env } from '@/environments'
import * as sendgrid from '@sendgrid/mail'

export type EmailFromType = {
  name?: string
  email: string
}

export type SendEmailType = {
  to: string
  from: EmailFromType
  subject: string
  text: any
  html?: any
}

export const sendEmail = async (data: SendEmailType) => {
  sendgrid.setApiKey(env.SENDGRID_API_KEY)
  return await sendgrid.send(data)
}
