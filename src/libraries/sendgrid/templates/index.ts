import axios from 'axios'
import { SendGridTemplateProps } from '../types'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL
export const sendWelcomeEmail = async (props: SendGridTemplateProps) => {
  const { name, password, phone, email } = props

  const data = {
    sendTo: email,
    subjectMessage: `${name}, Boas vindas ao seu Dedicado Digital!`,
    textMessage: `<p><strong>${name}</strong>, sua conta foi criada em nosso sistema.<br /> Acesse ${NEXTAUTH_URL} informando o número do seu celular <strong>${phone}</strong> e a senha <strong>${password}</strong>.</p>`,
  }

  return await axios
    .post(`${NEXTAUTH_URL}/api/email-send`, data)
    .then(() => {})
    .catch((error: any) => {
      console.error(error?.message || error)
    })
}

export const sendResetPasswordEmail = async (
  props: SendGridTemplateProps,
) => {
  const { name, password, phone, email } = props

  const data = {
    sendTo: email,
    subjectMessage: `${name}, uma nova senha para sua conta!`,
    textMessage: `<p><strong>${name}</strong>,uma nova senha foi definida para acessar ${NEXTAUTH_URL} .<br />Utilize o número do seu celular <strong>${phone}</strong> e a nova senha <strong>${password}</strong>.</p>`,
  }

  return await axios
    .post(`${NEXTAUTH_URL}/api/email-send`, data)
    .then(() => {})
    .catch((error: any) => {
      console.error(error?.message || error)
    })
}
