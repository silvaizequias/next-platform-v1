import { prisma } from '@/libraries/prisma'
import {
  GeolocationSchema,
  GeolocationSchemaType,
} from '@/types/geocoding/schema'
import { Prisma } from '@prisma/client'
import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id, softDeleted: false },
          select: {
            id: true,
            profile: true,
            name: true,
            email: true,
            phone: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<any> => {
  const { id } = params
  const inputs: GeolocationSchemaType = await request.json()

  const NEXT_PUBLIC_MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!
  try {
    if (await GeolocationSchema.parseAsync(inputs)) {
      const { latitude, longitude } = inputs

      const geocoding = await (
        await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${NEXT_PUBLIC_MAPBOX_API_KEY}`,
        )
      ).data

      const zipCode = geocoding.features[0].context[1]?.text.replace(
        /[^0-9]/g,
        '',
      )

      if (zipCode?.length < 8) {
        await prisma.user.update({
          where: { id },
          data: {
            latitude: latitude,
            longitude: longitude,
          },
        })
        return new NextResponse('locaclização imprecisa!', { status: 404 })
      }

      const viaCep = (
        await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      ).data

      const address = {
        zipCode: zipCode,
        street: viaCep?.logradouro! || geocoding.features[0]?.text!,
        complement: geocoding.features[0]?.address!,
        district: viaCep?.bairro!,
        city: viaCep?.localidade! || geocoding.features[0].context[1]?.text!,
        state: viaCep?.uf! || geocoding.features[0].context[2]?.text!,
      }

      const data: Prisma.UserUpdateInput = {
        zipCode: address?.zipCode!,
        street: address?.street!,
        complement: address?.complement!,
        district: address?.district!,
        city: address?.city!,
        state: address?.state!,
        latitude: latitude,
        longitude: longitude,
      }
      await prisma.user.update({ where: { id }, data })

      return new NextResponse(JSON.stringify('localização atualizada!'), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
