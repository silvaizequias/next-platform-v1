import { ReactNode } from 'react'

export interface MapBoxProps {
  children?: ReactNode
  latitude: number
  longitude: number
  position?: 'static' | 'relative' | 'absolute' | 'sticky'
  top?: number
  bottom?: number
  zoom?: number
}

export interface MapBoxMarkerProps {
  children: ReactNode
  id: string
  latitude: number
  longitude: number
}
