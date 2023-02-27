import type { NextApiRequest, NextApiResponse } from 'next/types'
import { Prisma } from '@prisma/client'
import prisma from 'src/libs/prisma'
import { hash } from 'bcrypt'
import { validateSchema } from 'src/middlewares/validate-schema'
import { signUpSchema } from '../schemas/signup'

import emailSendingWelcome from 'src/services/sendgrid/email-sending-welcome'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      return new Promise(async (resolve) => {
        try {
          const tokenRandom = Math.random()
            .toString(32)
            .substr(2, 12)
            .toUpperCase()
          const passRandom = Math.random().toString(32).substr(2, 12)

          const { name, email } = req.body

          const data: Prisma.UserCreateInput = {
            ...req.body,
            passToken: tokenRandom,
            passHash: await hash(passRandom, 10),
            role: 'GUEST',
            isActive: true
          }

          const create = await prisma.user.create({ data })
          await emailSendingWelcome({ name, email, passRandom })

          return res.status(200).send({ data: create })
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

export default validateSchema(signUpSchema, handler)
