import { env } from '@/environments'

export type AddressType = {
  cep: string
  address_type: string
  address_name: string
  address: string
  state: string
  district: string
  lat: string
  lng: string
  city: string
  city_ibge: string
  ddd: string
}

export default async function getAddress(
  zipCode: string,
): Promise<AddressType | any> {
  const address = await fetch(`${env.ZIPCODE_API_URL!}/${zipCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await address.json()
}
