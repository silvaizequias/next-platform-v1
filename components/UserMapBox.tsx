'use client'

import { LocationType, usePlatform } from '@/contexts/PlatformContext'
import MapBox from '@/components/MapBox'
import MapBoxMarker from '@/components/MapBoxMarker'
import { OrderType } from '@/types/order'
import { UserType } from '@/types/user'
import { Suspense } from 'react'
import UserMapBoxMarker from './UserMapBoxMarker'

export default function UserMapBox() {
  const { location }: LocationType | any = usePlatform()
  const { orders }: OrderType[] | any = usePlatform()
  const { user }: UserType | any = usePlatform()

  const image = user?.image || '/avatar.svg'

  return location ? (
    <MapBox latitude={location?.latitude} longitude={location?.longitude}>
      <MapBoxMarker
        latitude={location?.latitude}
        longitude={location?.longitude}
        title={'sua localização'}
        image={image}
      >
        <small className="text-xs opacity-50">{`${location?.latitude}, ${location?.longitude}`}</small>
      </MapBoxMarker>

      {orders && orders?.length > 0 ? (
        <Suspense>
          {orders?.map((order: OrderType) => {
            return (
              !order?.completed && (
                <div key={order?.id}>
                  <UserMapBoxMarker
                    location={location}
                    order={order}
                    user={user}
                  />
                </div>
              )
            )
          })}
        </Suspense>
      ) : null}
    </MapBox>
  ) : null
}
