'use client'

import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'

import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  latitude: number
  longitude: number
  zoom?: number
}

export default function MapBox(props: Props) {
  const { children, latitude, longitude, zoom } = props

  return latitude && longitude ? (
    <Map
      initialViewState={{
        latitude: latitude,
        longitude: longitude,
        zoom: zoom || 12,
        pitch: 25,
        bearing: -14,
      }}
      mapStyle={process.env.MAPBOX_STYLES}
      mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
      style={{ width: '100%', height: 600, borderRadius: 10, zIndex: 0 }}
    >
      <FullscreenControl />
      <GeolocateControl />
      <NavigationControl />
      <div className="relative">{children}</div>
    </Map>
  ) : null
}
