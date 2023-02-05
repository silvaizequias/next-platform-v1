import type { NextApiRequest, NextApiResponse } from 'next/types'
import prisma from 'src/libs/prisma'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateSchema } from 'src/middlewares/validate-schema'
import { signInSchema } from 'src/pages/api/schemas/signin'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      return new Promise(async (resolve) => {
        try {
          const { email, password } = req.body

          const user = await prisma.user.findFirst({
            where: {
              email: email
            },
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              passHash: true,
              role: true,
              isActive: true,
              company: {
                select: {
                  id: true,
                  name: true,
                  cnpj: true
                }
              }
            }
          })
          if (!user)
            return res.status(404).send({ message: 'E-mail Not Found' })

          //@ts-ignore
          const passHash = compareSync(password, user?.passHash)
          if (!passHash)
            return res.status(401).send({ message: 'Invalid Password' })

          //@ts-ignore
          delete user?.passHash

          const oneHourInSecounds = 3600
          const timeInHours = 1
          const tokenValidationTime = timeInHours * oneHourInSecounds
          const expiresIn = new Date().getTime() + 1000 * tokenValidationTime

          const encryptedToken = jwt.sign(
            { email, role: user.role, algorithm: 'HS256', exp: expiresIn },
            process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? 'SOME_RANDOM_KEY'
          )

          return res.status(200).send({
            expiresIn: expiresIn,
            Authorization: encryptedToken,
            data: user
          })
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

export default validateSchema(signInSchema, handler)
