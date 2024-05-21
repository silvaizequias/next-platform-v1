'use client'

import Image from 'next/image'
import { Fragment, ReactNode, useCallback, useState } from 'react'
import { Marker, Popup } from 'react-map-gl'

interface Props {
  children?: ReactNode
  color?: 'green' | 'red' | 'grey' | 'yellow' | 'orange'
  image?: string
  latitude: number
  longitude: number
  title?: string
}

export default function MapBoxMarker(props: Props) {
  const { children, color, image, latitude, longitude, title } = props

  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const handleOpenPopup = useCallback(() => {
    setOpenPopup(!openPopup)
  }, [openPopup])

  const avatar = image || '/avatar.svg'

  return latitude && longitude ? (
    <Fragment>
      <Marker
        latitude={latitude}
        longitude={longitude}
        onClick={handleOpenPopup}
        color={color}
      >
        {image && (
          <div className="relative">
            <Image
              className="w-[32px] h-[32px] mx-auto rounded-full"
              src={avatar}
              alt={'dedicado'}
              width={32}
              height={32}
              priority
            />
          </div>
        )}
      </Marker>
      {openPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          onClose={handleOpenPopup}
          closeButton={true}
          closeOnClick={false}
          offset={25}
          style={{ borderRadius: 10 }}
        >
          <h4 className="text-center text-lg lowercase">{title}</h4>
          <div className="relative">{children}</div>
        </Popup>
      )}
    </Fragment>
  ) : null
}
