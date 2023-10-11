import {
  GeolocationSchema,
  GeolocationSchemaType,
} from '@/types/geocoding/schema'
import axios from 'axios'
import { NextResponse } from 'next/server'

export const POST = async (request: Request): Promise<any> => {
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

      if (zipCode?.length < 8)
        return new NextResponse('locaclização imprecisa!', { status: 404 })

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

      return new NextResponse(JSON.stringify(address), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
