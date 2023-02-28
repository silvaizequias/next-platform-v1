import type { NextApiRequest, NextApiResponse } from 'next/types'

import sendgrid from '@sendgrid/mail'
import themeConfig from 'src/configs/themeConfig'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  const { name, email, phone, subject, message } = req.body

  const sendgridKey = String(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  const sendgridFromEmail = String(process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL)

  const content = {
    to: 'suporte@sistemadedicado.com',
    reply_to: email,
    from: {
      email: sendgridFromEmail,
      name: themeConfig.templateName,
    },
    subject: `${name} - ${subject}`,
    text: `
      <p>
      <strong>Assunto: </strong>${subject}
      <br />
      <strong>Mensagem: </strong>${message}
      </p>
      <p>
      <strong>${name}</strong>
      <br />
      <small>${phone}</small>
      </p>
      `,
    html: `
    <p>
      <strong>Assunto: </strong>${subject}
      <br />
      <strong>Mensagem: </strong>${message}
      </p>
      <p>
      <strong>${name}</strong>
      <br />
      <small>${phone}</small>
      </p>
      `,
  }
  sendgrid.setApiKey(sendgridKey)

  switch (method) {
    case 'POST':
      try {
        await sendgrid.send(content)
        res.status(200).send('Message Sent!')
      } catch (error) {
        return res.status(400).send({ message: error })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.status(404).send({ message: 'Not found' })
  }
}

export default handler
