import sendgrid from '@sendgrid/mail'
import themeConfig from 'src/configs/themeConfig'

interface Props {
  name: string
  email: string
  passRandom: string
}

export default async function emailSendingWelcome({
  name,
  email,
  passRandom
}: Props) {
  const sendgridKey = String(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  const sendgridFromEmail = String(process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL)
  const url = String(process.env.NEXTAUTH_URL)

  sendgrid.setApiKey(sendgridKey)
  await sendgrid.send({
    to: email,
    from: { email: sendgridFromEmail, name: themeConfig.templateName },
    subject: `Boas Vindas ao ${themeConfig.templateName}`,
    text: `<p>Olá ${name}, seja muito bem vindo a ${themeConfig.templateName}!</p>
          <p>Sua conta foi criada em nosso sistema, e agora poderá acessar o portal ${url} através do seu e-mail <strong>${email}</strong> e senha <strong>${passRandom}</strong></p>
          <p></p>
          <p>É um prazer ter você em nosso sistema!</p>`,
    html: `<p>Olá ${name}, seja muito bem vindo a ${themeConfig.templateName}!</p>
          <p>Sua conta foi criada em nosso sistema, e agora poderá acessar o portal ${url} através do seu e-mail <strong>${email}</strong> e senha <strong>${passRandom}</strong></p>
          <p></p>
          <p>É um prazer ter você em nosso sistema!</p>`
  })
}
