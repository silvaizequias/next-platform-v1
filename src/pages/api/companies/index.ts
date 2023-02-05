import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import prisma from 'src/libs/prisma'
import axios from 'axios'
import { validateSchema } from 'src/middlewares/validate-schema'
import { companySchema } from 'src/pages/api/schemas/company'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })
  const { method } = req

  switch (method) {
    case 'GET':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        const findMany = await prisma.company.findMany({
          select: {
            id: true,
            name: true,
            cnpj: true
          }
        })
        return res.status(200).send({ data: findMany })
      } catch (error) {
        return res.status(400).send({ message: error })
      }

    case 'POST':
      //if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
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

        const tokenRandom = Math.random()
          .toString(32)
          .substr(2, 12)
          .toUpperCase()

        const data: Prisma.CompanyCreateInput = {
          ...req.body,
          token: await hash(tokenRandom, 10),
          street: addressPoint.logradouro,
          district: addressPoint.bairro,
          city: addressPoint.localidade,
          state: addressPoint.uf,
          lat: locale.geometry.location.lat,
          long: locale.geometry.location.lng
        }
        const create = await prisma.company.create({ data })
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

export default validateSchema(companySchema, handler)
