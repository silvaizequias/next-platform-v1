import * as sendgrid from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!

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

export const sendEmail = (data: SendEmailType) => {
  sendgrid.setApiKey(SENDGRID_API_KEY)
  sendgrid
    .send(data)
    .then(async () => {})
    .catch((error: any) => {
      console.error('SENDGRID ERROR: ', error)
    })
}
