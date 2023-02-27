import sendgrid from '@sendgrid/mail'

interface Props {
  name: string
  email: string
  passRandom: string
}

export default async function emailSendingWelcome({
  name,
  email,
  passRandom,
}: Props) {
  const sendgridKey = process.env.NEXT_PUBLIC_SENDGRID_KEY as string
  const sendgridFromEmail = process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL as string
  const url = process.env.NEXTAUTH_URL as string
  const systemName = process.env.NEXT_PUBLIC_SYSTEM_NAME as string

  sendgrid.setApiKey(sendgridKey)
  await sendgrid.send({
    to: email,
    from: { email: sendgridFromEmail, name: systemName },
    subject: `Boas Vindas ao ${systemName}`,
    text: `<p>Olá ${name}, seja muito bem vindo a ${systemName}!</p>
          <p>Sua conta foi criada em nosso sistema, e agora poderá acessar o portal ${url}/portal/ através do seu e-mail <strong>${email}</strong> e senha <strong>${passRandom}</strong></p>
          <p></p>
          <p>É um prazer ter você em nosso sistema!</p>`,
    html: `<p>Olá ${name}, seja muito bem vindo a ${systemName}!</p>
          <p>Sua conta foi criada em nosso sistema, e agora poderá acessar o portal ${url}/portal/ através do seu e-mail <strong>${email}</strong> e senha <strong>${passRandom}</strong></p>
          <p></p>
          <p>É um prazer ter você em nosso sistema!</p>`,
  })
}
