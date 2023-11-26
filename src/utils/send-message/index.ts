import { EmailFromType, sendEmail } from './sendgrid'
import {
  newOrganizationUserTemplate,
  passwordResetTemplate,
  welcomeMessageTemplate,
} from './templates'
import { sendSms } from './twilio'

export type SendMessageType = {
  emailTo: string
  name?: string
  organization?: string
  password?: string
  phoneTo?: string
  role?: string
  solution?: string
}

const NEXTAUTH_URL = process.env.NEXTAUTH_URL
const SENDGRID_EMAIL_FROM = process.env.SENDGRID_EMAIL_FROM!
const emailFrom: EmailFromType = {
  name: 'DEDICADO DIGITAL',
  email: SENDGRID_EMAIL_FROM || 'master@dedicado.digital',
}
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

export const sendWelcomeMessage = async (data: SendMessageType) => {
  const message = await welcomeMessageTemplate({
    name: data?.name,
    organization: data?.organization,
    password: data?.password,
    solution: data?.solution || NEXTAUTH_URL,
  })

  sendEmail({
    to: data?.emailTo,
    from: emailFrom,
    subject: `BOAS VINDAS A ${data.organization || 'DEDICADO DIGITAL'}`,
    text: message[0].email,
    html: message[0].email,
  })

  if (data?.phoneTo)
    sendSms({
      to: data?.phoneTo,
      from: TWILIO_PHONE_NUMBER,
      body: message[0].sms,
    })
}

export const sendPasswordResetMessage = async (data: SendMessageType) => {
  const message = await passwordResetTemplate({
    name: data?.name,
    organization: data?.organization,
    password: data?.password,
    solution: data?.solution || NEXTAUTH_URL,
  })

  sendEmail({
    to: data?.emailTo,
    from: emailFrom,
    subject: `SEU ACESSO A ${data.organization || 'DEDICADO DIGITAL'}`,
    text: message[0].email,
    html: message[0].email,
  })

  if (data?.phoneTo)
    sendSms({
      to: data?.phoneTo,
      from: TWILIO_PHONE_NUMBER,
      body: message[0].sms,
    })
}

export const sendNewOrganizationUser = async (data: SendMessageType) => {
  const message = await newOrganizationUserTemplate({
    name: data?.name,
    organization: data?.organization,
    role: data?.role,
    solution: data?.solution || NEXTAUTH_URL,
  })

  sendEmail({
    to: data?.emailTo,
    from: emailFrom,
    subject: `AGORA VOCÊ FAZ PARTE DA ${
      data.organization || 'DEDICADO DIGITAL'
    }`,
    text: message[0].email,
    html: message[0].email,
  })

  if (data?.phoneTo)
    sendSms({
      to: data?.phoneTo,
      from: TWILIO_PHONE_NUMBER,
      body: message[0].sms,
    })
}
