import type { NextApiRequest, NextApiResponse } from 'next/types'
import { getToken } from 'next-auth/jwt'
import { Prisma } from '@prisma/client'
import prisma from 'src/libs/prisma'
import { validateSchema } from 'src/middlewares/validate-schema'
import { contractSchema } from 'src/pages/api/schemas/contract'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })
  const { method } = req

  switch (method) {
    case 'GET':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findMany = await prisma.contract.findMany()

        return res.status(200).send({ data: findMany })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'POST':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const { userEmail } = req.body.userEmail
        delete req.body.userEmail
        const user = await prisma.user.findFirst({
          where: {
            email: userEmail
          }
        })
        if (!user) return res.status(404).send({ message: 'User Not Found' })

        const { serviceCode } = req.body.serviceCode
        delete req.body.serviceCode
        const service = await prisma.service.findFirst({
          where: {
            serviceCode: serviceCode
          }
        })
        if (!service)
          return res.status(404).send({ message: 'Service Not Found' })

        const randomCode = Math.random()
          .toString(32)
          .substr(2, 16)
          .toUpperCase()

        const data: Prisma.ContractCreateInput = {
          ...req.body,
          contractCode: randomCode,
          user: {
            connect: {
              email: user.email
            }
          },
          service: {
            connect: {
              serviceCode: service.serviceCode
            }
          }
        }
        const create = await prisma.contract.create({ data })
        
        return res.status(200).send({ data: create })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.status(404).send({ message: 'Not found' })
  }
}

export default validateSchema(contractSchema, handler)
