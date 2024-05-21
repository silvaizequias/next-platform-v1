'use server'

import { RoutesByCoordinatesType } from './types'

export const getRoutesByCoordinates = async ({
  destination,
  origin,
}: RoutesByCoordinatesType): Promise<any> => {
  if (!destination || !origin) return null

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${
    origin?.longitude + ',' + origin?.latitude
  };${
    destination?.longitude + ',' + destination?.latitude
  }?overview=full&geometries=geojson&access_token=${
    process.env.MAPBOX_ACCESS_TOKEN
  }`

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const getRoutesByJson = async (url: string): Promise<any> => {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
