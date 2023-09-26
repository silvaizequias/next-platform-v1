import axios from 'axios'
import { TwilioTemplateProps } from '../types'

export const sendWelcomeSms = async (props: TwilioTemplateProps) => {
  const { name, password, phone } = props
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL
  //TODO: implementar header authorization para os posts do axios

  const data = {
    sendTo: phone,
    messageBody: `${name}, sua conta foi criada na ${NEXTAUTH_URL}, e a senha definida para acesso é ${password}`,
  }

  return await axios
    .post(`${NEXTAUTH_URL}/api/sms-send`, data)
    .then(() => {})
    .catch((error: any) => {
      console.error(error?.message || error)
    })
}

export const sendResetPasswordSms = async (props: TwilioTemplateProps) => {
  const { name, password, phone } = props
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const data = {
    sendTo: phone,
    messageBody: `${name}, sua senha para acessar ${NEXTAUTH_URL}, foi definida para ${password}`,
  }

  return await axios
    .post(`${NEXTAUTH_URL}/api/sms-send`, data)
    .then(() => {})
    .catch((error: any) => {
      console.error(error?.message || error)
    })
}
