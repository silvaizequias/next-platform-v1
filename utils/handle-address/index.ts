'use server'

import { getServerSession } from 'next-auth'
import {
  AddressByGeolocationType,
  AddressByZipCodeType,
  UpdateAddressType,
} from './types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { organizationRepositoryUpdate } from '@/repositories/organization/PATCH'
import { revalidatePath, revalidateTag } from 'next/cache'
import { userRepositoryUpdate } from '@/repositories/user/PATCH'

export const updateAddress = async (
  inputs: UpdateAddressType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''
  const { address, param, paramId } = inputs

  switch (param) {
    case 'organization':
      return await organizationRepositoryUpdate(paramId!, address)
        .then((data) => {
          revalidatePath('/')
          revalidateTag('organization')

          return data
        })
        .catch((error) => error?.message)

    case 'user':
      return await userRepositoryUpdate(userId, address)
        .then((data) => {
          revalidatePath('/profile')
          revalidateTag('users')

          return data
        })
        .catch((error) => error?.message)

    default:
      return null
  }
}

export const getAddressByZipCode = async (
  zipCode: string,
): Promise<AddressByZipCodeType | any> => {
  return await fetch(`${process.env.ZIPCODE_API_URL}/${zipCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const getAddressByGeolocationType = async (
  latitude: number,
  longitude: number,
): Promise<AddressByGeolocationType | any> => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&autocomplete=true`

  return await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (data: any) => {
      const result = await data.json()
      return {
        place: result?.features[0]?.place_name,
        street: result?.features[0]?.text,
        number: result?.features[0]?.address,
        district: result?.features[0]?.context[0]?.text,
        zipCode: result?.features[0]?.context[1]?.text,
        city: result?.features[0]?.context[3]?.text,
        state: result?.features[0]?.context[4]?.text,
        country: result?.features[0]?.context[5]?.text,
      }
    })
    .catch((error: any) => error?.message)
}
