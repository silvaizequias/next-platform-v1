import type { NextApiRequest, NextApiResponse } from 'next/types'
import { getToken } from 'next-auth/jwt'
import prisma from 'src/libs/prisma'
import { validateSchema } from 'src/middlewares/validate-schema'
import { serviceSchema } from 'src/pages/api/schemas/service'

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
        const findFirst = await prisma.service.findFirst({
          where: { id: id },
          include: {
            contracts: true
          }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'Service Not Found!' })
        
        return res.status(200).send({ data: findFirst })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'PATCH':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const service = await prisma.service.findFirst({
          where: { id: id }
        })
        if (!service)
          return res.status(404).send({ message: 'Service Not Found!' })

        const update = await prisma.service.update({
          where: { id: id },
          data: req.body
        })

        return res.status(200).send({ data: update })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'DELETE':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findFirst = await prisma.service.findFirst({
          where: { id: id }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'Service Not Found!' })

        const remove = await prisma.service.delete({ where: { id: id } })
        
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

export default validateSchema(serviceSchema, handler)
