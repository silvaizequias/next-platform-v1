import { EmailFromType, sendEmail } from './sendgrid'
import { passwordResetTemplate, welcomeMessageTemplate } from './templates'

export type SendMessageType = {
  emailTo: string
  name?: string
  organization?: string
  password?: string
  phoneTo?: string
  solution?: string
}

const SENDGRID_EMAIL_FROM = process.env.SENDGRID_EMAIL_FROM!
const emailFrom: EmailFromType = {
  name: 'DEDICADO DIGITAL',
  email: SENDGRID_EMAIL_FROM || 'master@dedicado.digital',
}

export const sendWelcomeMessage = async (data: SendMessageType) => {
  const message = await welcomeMessageTemplate({
    name: data?.name,
    organization: data?.organization,
    password: data?.password,
    solution: data?.solution,
  })

  sendEmail({
    to: data?.emailTo,
    from: emailFrom,
    subject: `BOAS VINDAS A ${data.organization || 'DEDICADO DIGITAL'}`,
    text: message,
    html: message,
  })
}

export const sendPasswordResetMessage = async (data: SendMessageType) => {
  const message = await passwordResetTemplate({
    name: data?.name,
    organization: data?.organization,
    password: data?.password,
    solution: data?.solution,
  })

  sendEmail({
    to: data?.emailTo,
    from: emailFrom,
    subject: `SEU ACESSO A ${data.organization || 'DEDICADO DIGITAL'}`,
    text: message,
    html: message,
  })
}
