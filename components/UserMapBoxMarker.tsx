'use client'

import { LocationType } from '@/contexts/PlatformContext'
import { OrderType } from '@/types/order'
import { getRoutesByCoordinates } from '@/utils/handle-location'
import { Fragment, useCallback, useEffect, useState } from 'react'
import MapBoxMarker from './MapBoxMarker'
import MapBoxSource from './MapBoxSource'
import { UserType } from '@/types/user'
import CompleteOrderButton from '@/app/main/(organization)/[document]/pedidos/components/CompleteOrderButton'
import CancelOrderButton from '@/app/main/(organization)/[document]/pedidos/components/CancelOrderButton'
import OrderStartButton from '@/app/main/(organization)/[document]/pedidos/components/OrderStartButton'
import { AddressByZipCodeType } from '@/utils/handle-address/types'
import { getAddressByZipCode } from '@/utils/handle-address'
import { userRepositoryFindByDocument } from '@/repositories/user/GET'

interface Props {
  location: LocationType
  order: OrderType
  user: UserType
}

export default function UserMapBoxMarker(props: Props) {
  const { location, order, user } = props

  const [routes, setRoutes] = useState<[]>([])
  const [customer, setCustomer] = useState<UserType | any>()
  const [address, setAddress] = useState<AddressByZipCodeType | any>()

  const data = useCallback(async () => {
    const customer = await userRepositoryFindByDocument(order?.customer)
    customer && setCustomer(customer)

    const address = await getAddressByZipCode(customer?.zipCode)
    address && setAddress(address)
  }, [order])

  useEffect(() => {
    if (order) data()
  }, [data, order])

  const coordinates = useCallback(async () => {
    if (!order) return null
    const coordinates = await getRoutesByCoordinates({
      origin: {
        latitude: order?.started
          ? location?.latitude || order?.latitude || order?.originLatitude
          : order?.latitude || order?.originLatitude,
        longitude: order?.started
          ? location?.longitude || order?.longitude || order?.originLongitude
          : order?.longitude || order?.originLongitude,
      },
      destination: {
        latitude: order?.latitude || order?.destinationLatitude,
        longitude: order?.longitude || order?.destinationLongitude,
      },
    })
    coordinates && setRoutes(coordinates?.routes[0]?.geometry?.coordinates)
  }, [order, location])

  useEffect(() => {
    if (order?.started) coordinates()
  }, [coordinates, order])

  return order ? (
    <Fragment>
      <MapBoxMarker
        latitude={order?.latitude || order?.destinationLatitude}
        longitude={order?.longitude || order?.destinationLongitude}
        title={order?.subject || order?.code}
        color={
          order?.started ? 'green' : 'grey' || (order?.canceled && 'orange')
        }
      >
        <div className="flex justify-center mb-2">
          <small className="text-xs text-center opacity-50">{`${
            order?.destinationLatitude || order?.latitude
          }, ${order?.destinationLongitude || order?.longitude}`}</small>
        </div>
        <div className="w-full bg-slate-200 shadow-md p-2 my-2 rounded-md">
          <div className="flex items-center gap-2">
            <small className="text-xs font-thin">cliente:</small>
            <h4 className="text-lg font-semibold lowercase">
              {customer?.name}
            </h4>
          </div>
          <div>
            <p className="italic opacity-50">{order?.observation}</p>
          </div>
        </div>

        {order?.canceled && (
          <div className="flex justify-center bg-orange-200 rounded-md p-2">
            <small className="text-xs text-center italic">
              {order?.cancellationNote}
            </small>
          </div>
        )}
        {!order?.canceled && (
          <OrderStartButton
            member={user}
            orderId={order?.id}
            started={order?.started}
          />
        )}
        <CompleteOrderButton
          canceled={order?.canceled}
          member={user}
          orderId={order?.id}
          started={order?.started}
        />
        {!order?.canceled && (
          <CancelOrderButton
            canceled={order?.canceled}
            member={user}
            orderId={order?.id}
          />
        )}
      </MapBoxMarker>
      {order?.started && <MapBoxSource routes={routes} />}
    </Fragment>
  ) : null
}
