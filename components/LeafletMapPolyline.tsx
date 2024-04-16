'use client'

import { LocationType } from '@/contexts/PlatformContext'
import { useState } from 'react'
import { Polyline } from 'react-leaflet'

interface Props {
  destination: LocationType
  origin: LocationType
}

export default function LeafletMapPolyline(props: Props) {
  const { destination, origin } = props
  const [routes, setRoutes] = useState([
    {
      lat: destination?.latitude,
      lng: destination?.longitude,
    },
    {
      lat: origin?.latitude,
      lng: origin?.longitude,
    },
  ])

  return routes ? <Polyline color="green" positions={routes} /> : null
}
