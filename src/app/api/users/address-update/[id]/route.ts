import { prisma } from '@/libraries/prisma'
import {
  UserAddressUpdateSchema,
  UserAddressUpdateSchemaType,
} from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import axios from 'axios'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<UserAddressUpdateSchemaType | any> => {
  const { id } = params
  const NEXT_PUBLIC_MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!
  const inputs: UserAddressUpdateSchemaType = await request.json()
  try {
    if (await UserAddressUpdateSchema.parseAsync(inputs)) {
      const { street, complement, district, city, state } = inputs

      const address = `${complement} ${street} ${district} ${city} ${state}`
      const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${NEXT_PUBLIC_MAPBOX_API_KEY}&autocomplete=true`

      const userLocation: any = (await axios.get(mapbox)).data

      const data: Prisma.UserUpdateInput = {
        ...inputs,
        latitude: userLocation?.features[0].center[1]!,
        longitude: userLocation?.features[0].center[0]!,
      }
      await prisma.user.update({ where: { id }, data })

      return new NextResponse(
        JSON.stringify('as informações foram atualizadas!'),
        {
          status: 201,
        },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
