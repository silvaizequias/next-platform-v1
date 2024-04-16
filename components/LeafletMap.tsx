'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'
import 'leaflet/dist/leaflet.css'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  key?: string | any
  latitude: number
  longitude: number
  zoom?: number
}

export default function LeafletMap(props: Props) {
  const { children, key, latitude, longitude, zoom } = props

  return (
    <MapContainer
      key={key}
      center={{ lat: latitude, lng: longitude }}
      minZoom={4}
      zoom={zoom || 12}
      maxZoom={16}
      zoomAnimation={true}
      markerZoomAnimation={true}
      scrollWheelZoom={true}
      fadeAnimation={true}
      style={{ width: '100%', height: 600, borderRadius: 10, zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FullscreenControl
        title="ativar tela inteira"
        titleCancel="desativar tela inteira"
      />
      <div className="relative">{children}</div>
    </MapContainer>
  )
}
