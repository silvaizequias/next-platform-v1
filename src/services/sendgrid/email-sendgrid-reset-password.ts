import sendgrid from '@sendgrid/mail'
import themeConfig from 'src/configs/themeConfig'

interface Props {
  name: string
  email: string
  passRandom: string
}

export default async function emailSendingResetPassword({
  name,
  email,
  passRandom,
}: Props) {
  const sendgridKey = String(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  const sendgridFromEmail = String(process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL)
  const url = String(process.env.NEXTAUTH_URL)

  sendgrid.setApiKey(sendgridKey)
  await sendgrid.send({
    to: email,
    from: { email: sendgridFromEmail, name: themeConfig.templateName },
    subject: `${themeConfig.templateName} - Redefinição de Senha`,
    text: `<p>Olá ${name}!</p>
        <p>Conforme solicitado, sua senha foi redefinida, e agora poderá acessar o portal ${url}/portal através do seu e-mail <strong>${email}</strong> e a nova senha <strong>${passRandom}</strong></p>
        <p></p>
        <p>É um prazer ter você em nosso sistema!</p>`,
    html: `<p>Olá ${name}, seja muito bem vindo a ${themeConfig.templateName}!</p>
        <p>Conforme solicitado, sua senha foi redefinida, e agora poderá acessar o portal ${url}/portal através do seu e-mail <strong>${email}</strong> e a nova senha <strong>${passRandom}</strong></p>
        <p></p>
        <p>É um prazer ter você em nosso sistema!</p>`,
  })
}
