import type { NextApiRequest, NextApiResponse } from 'next/types'
import { Prisma } from '@prisma/client'
import prisma from 'src/libs/prisma'
import { hash } from 'bcrypt'
import { validateSchema } from 'src/middlewares/validate-schema'
import { resetPasswordSchema } from '../schemas/reset-password'

import emailSendingResetPassword from 'src/services/sendgrid/email-sendgrid-reset-password'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      return new Promise(async (resolve) => {
        try {
          const { email, phone } = req.body

          const user = await prisma.user.findFirst({
            where: {
              phone: phone,
              email: email,
            },
          })
          if (!user) {
            throw ErrorEvent
          }

          const passRandom = Math.random().toString(32).substr(2, 12)

          const data: Prisma.UserUpdateInput = {
            passHash: await hash(passRandom, 10),
          }

          const name = user.name
          await prisma.user.update({ where: { email }, data })
          await emailSendingResetPassword({ name, email, passRandom })

          return res.status(200).send({ message: `Password has been redefined and sending for the e-mail ${email}!`})
        } catch (error) {
          res.status(400).send({ message: error })
        }

        return resolve
      })

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.status(404).send({ message: 'Not found' })
  }
}

export default validateSchema(resetPasswordSchema, handler)
