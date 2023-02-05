import { Prisma } from '@prisma/client'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next/types'
import { getToken } from 'next-auth/jwt'
import prisma from 'src/libs/prisma'
import { validateSchema } from 'src/middlewares/validate-schema'
import { userSchema } from 'src/pages/api/schemas/user'

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
        const findFirst = await prisma.user.findFirst({
          where: { id: id },
          include: {
            company: true,
            invoices: true,
            contracts: true
          }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'User Not Found!' })
        
        return res.status(200).send({ data: findFirst })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'PATCH':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const { companyCnpj } = req.body
        if (!companyCnpj) {
          prisma.user.update({
            where: { id: id },
            data: req.body
          })
        }
        delete req.body.companyCnpj

        const company = await prisma.company.findFirst({
          where: { cnpj: companyCnpj }
        })
        if (!company)
          return res.status(403).send({ message: 'Company Not Found!' })

        const zipCode = req.body.zipCode
        const viaCep = axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
        const addressPoint = (await viaCep).data

        const number = ` ${req.body.number || 0}`
        const hostGeocoding = 'google-maps-geocoding.p.rapidapi.com'

        const geoCode = axios.get(`https://${hostGeocoding}/geocode/json`, {
          params: {
            address: zipCode + addressPoint.logradouro + number,
            language: 'en'
          },
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
            'X-RapidAPI-Host': hostGeocoding
          }
        })

        const pointer = (await geoCode).data.results
        const [locale] = pointer

        const data: Prisma.UserUpdateInput = {
          ...req.body,
          street: addressPoint.logradouro,
          district: addressPoint.bairro,
          city: addressPoint.localidade,
          state: addressPoint.uf,
          lat: locale.geometry.location.lat,
          long: locale.geometry.location.lng,
          company: {
            connect: {
              cnpj: company.cnpj
            }
          }
        }
        const update = await prisma.user.update({ where: { id: id }, data })

        return res.status(200).send({ data: update })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'DELETE':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findFirst = await prisma.user.findFirst({
          where: { id: id }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'User Not Found!' })

        const remove = await prisma.user.delete({ where: { id: id } })
        
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

export default validateSchema(userSchema, handler)
