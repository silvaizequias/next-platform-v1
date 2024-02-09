import { env } from '@/environments'

export default async function getAddress(zipCode: string) {
  const address = await fetch(`${process.env.NEXT_PUBLIC_ZIPCODE_API_URL}/${zipCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await address.json()
}
