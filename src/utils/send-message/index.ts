import { EmailFromType, sendEmail } from '@/services/sendgrid'
import {
  organizationUserTemplate,
  passwordResetTemplate,
  welcomeMessageTemplate,
} from './templates'
import { SendMessageType } from '@/types/send-message'
import { sendSms } from '@/services/twilio'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL
const SENDGRID_EMAIL_FROM = process.env.SENDGRID_EMAIL_FROM
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

const emailFrom: EmailFromType = {
  name: 'DEDICADO DIGITAL',
  email: SENDGRID_EMAIL_FROM || 'master@dedicado.digital',
}

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

export const sendOrganizationUserMessage = async (data: SendMessageType) => {
  const message = await organizationUserTemplate({
    name: data?.name,
    organization: data?.organization,
  })

  sendEmail({
    to: data?.emailTo,
    from: emailFrom,
    subject: `VOCÊ AGORA É MEMBRO DA ${
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
