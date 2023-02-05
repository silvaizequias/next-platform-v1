import type { NextApiRequest, NextApiResponse } from 'next/types'
import { getToken } from 'next-auth/jwt'
import { Prisma } from '@prisma/client'
import prisma from 'src/libs/prisma'
import { validateSchema } from 'src/middlewares/validate-schema'
import { serviceSchema } from 'src/pages/api/schemas/service'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })
  const { method } = req

  switch (method) {
    case 'GET':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findMany = await prisma.service.findMany({
          include: {
            contracts: true
          }
        })

        return res.status(200).send({ data: findMany })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'POST':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const randomCode = Math.random()
          .toString(32)
          .substr(2, 16)
          .toUpperCase()

        const data: Prisma.ServiceCreateInput = {
          ...req.body,
          serviceCode: randomCode
        }
        const create = await prisma.service.create({ data })
        
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

export default validateSchema(serviceSchema, handler)
