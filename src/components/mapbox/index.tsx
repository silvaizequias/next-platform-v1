import Map from 'react-map-gl'
import { MapBoxProps } from './types'

export default function MapBox(props: MapBoxProps) {
  const { children, latitude, longitude, position, top, bottom, zoom } = props

  const NEXT_PUBLIC_MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!
  const NEXT_PUBLIC_MAPBOX_STYLES = process.env.NEXT_PUBLIC_MAPBOX_STYLES!

  return (
    <Map
      initialViewState={{
        latitude: latitude,
        longitude: longitude,
        zoom: zoom || 10,
        pitch: 25,
        bearing: -14,
      }}
      mapStyle={NEXT_PUBLIC_MAPBOX_STYLES}
      mapboxAccessToken={NEXT_PUBLIC_MAPBOX_API_KEY}
      style={{
        //position: position || 'absolute',
        //top: top || 0,
        //bottom: bottom || 0,
        width: '100%',
        minHeight: '420px',
        maxHeight: '640px'
      }}
    >
      {children}
    </Map>
  )
}
