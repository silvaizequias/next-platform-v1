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

  // @ts-ignore
  const id = String(req.query.id)

  switch (method) {
    case 'GET':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findFirst = await prisma.contract.findFirst({
          where: { id: id }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'Contract Not Found!' })
        
        return res.status(200).send({ data: findFirst })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'PATCH':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const { userEmail } = req.body.userEmail
        if (!userEmail) {
          await prisma.contract.update({
            where: { id: id },
            data: req.body
          })
        }
        delete req.body.userEmail
        const user = await prisma.user.findFirst({
          where: {
            email: userEmail
          }
        })
        if (!user) return res.status(404).send({ message: 'User Not Found' })

        const { serviceCode } = req.body.serviceCode
        if (!serviceCode) {
          await prisma.contract.update({
            where: { id: id },
            data: req.body
          })
        }
        delete req.body.serviceCode
        const service = await prisma.service.findFirst({
          where: {
            serviceCode: serviceCode
          }
        })
        if (!service)
          return res.status(404).send({ message: 'Service Not Found' })

        const data: Prisma.ContractUpdateInput = {
          ...req.body,
          user: {
            update: {
              email: user.email
            }
          },
          service: {
            update: {
              serviceCode: service.serviceCode
            }
          }
        }
        const update = await prisma.contract.update({ where: { id: id }, data })

        return res.status(200).send({ update })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'DELETE':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findFirst = await prisma.contract.findFirst({
          where: { id: id }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'Contract Not Found!' })

        const remove = await prisma.contract.delete({ where: { id: id } })

        return res.status(200).send({ data: remove })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.status(404).send({ message: 'Not found' })
  }
}

export default validateSchema(contractSchema, handler)
