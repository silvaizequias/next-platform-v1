import { Prisma } from '@prisma/client'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import prisma from 'src/libs/prisma'
import { validateSchema } from 'src/middlewares/validate-schema'
import { companySchema } from 'src/pages/api/schemas/company'

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
        const findFirst = await prisma.company.findFirst({
          where: { id: id }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'Company Not Found!' })
        return res.status(200).send({ data: findFirst })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'PATCH':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const company = prisma.company.findFirst({
          where: { id: id }
        })
        if (!company)
          return res.status(404).send({ message: 'Company Not Found!' })

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

        const data: Prisma.CompanyUpdateInput = {
          ...req.body,
          street: addressPoint.logradouro,
          district: addressPoint.bairro,
          city: addressPoint.localidade,
          state: addressPoint.uf,
          lat: locale.geometry.location.lat,
          long: locale.geometry.location.lng
        }
        const update = await prisma.company.update({ where: { id: id }, data })
        return res.status(200).send({ data: update })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'DELETE':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findFirst = await prisma.company.findFirst({
          where: { id: id }
        })
        if (!findFirst)
          return res.status(404).send({ message: 'Company Not Found!' })

        const remove = await prisma.company.delete({ where: { id: id } })
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

export default validateSchema(companySchema, handler)
