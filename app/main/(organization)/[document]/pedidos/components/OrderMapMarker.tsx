'use client'

import MapBoxMarker from '@/components/MapBoxMarker'
import { OrderType } from '@/types/order'
import { UserType } from '@/types/user'
import { getAddressByZipCode } from '@/utils/handle-address'
import { AddressByZipCodeType } from '@/utils/handle-address/types'
import { Suspense, useCallback, useEffect, useState } from 'react'
import OrderStartButton from './OrderStartButton'
import AssignOrderButton from './AssignOrderButton'
import CompleteOrderButton from './CompleteOrderButton'
import CancelOrderButton from './CancelOrderButton'
import {
  userRepositoryFindByDocument,
  userRepositoryFindByPhone,
} from '@/repositories/user/GET'

interface Props {
  order: OrderType | any
}

export default function OrderMapMarker(props: Props) {
  const { order } = props

  const [member, setMember] = useState<UserType | any>()
  const [customer, setCustomer] = useState<UserType | any>()
  const [address, setAddress] = useState<AddressByZipCodeType | any>()

  const data = useCallback(async () => {
    try {
      const member = await userRepositoryFindByPhone(order?.member)
      member && setMember(member)

      const customer = await userRepositoryFindByDocument(order?.customer)
      customer && setCustomer(customer)

      const address = await getAddressByZipCode(customer?.zipCode)
      address && setAddress(address)

      return member
    } catch (error: any) {
      return null
    }
  }, [order])

  useEffect(() => {
    if (order) data()
  }, [data, order])

  return order && member && customer && address ? (
    <Suspense>
      {member?.available && (
        <MapBoxMarker
          latitude={member?.latitude}
          longitude={member?.longitude}
          image={member?.image}
          title={member?.name}
        >
          <div className="flex justify-center">
            <small className="text-xs text-center opacity-50">{`${member?.latitude}, ${member?.longitude}`}</small>
          </div>
        </MapBoxMarker>
      )}

      <MapBoxMarker
        latitude={
          order?.latitude ||
          order?.destinationLatitude ||
          customer?.latitude ||
          address?.lat
        }
        longitude={
          order?.longitude ||
          order?.destinationLongitude ||
          customer?.longitude ||
          address?.lng
        }
        title={order?.subject || order?.code}
        color={
          (order?.started && 'green') ||
          (order?.canceled && 'orange') ||
          (!order?.member && 'grey')
        }
      >
        <div className="flex justify-center mb-2">
          <small className="text-xs text-center opacity-50">{`${
            order?.latitude ||
            order?.destinationLatitude ||
            customer?.latitude ||
            address?.lat
          }, ${
            order?.longitude ||
            order?.destinationLongitude ||
            customer?.longitude ||
            address?.lng
          }`}</small>
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
        {order?.member && (
          <div className="flex items-center gap-2">
            <small className="text-xs font-thin">responsável:</small>
            <h4 className="text-lg font-semibold lowercase">{member?.name}</h4>
          </div>
        )}
        {!order?.member && (
          <AssignOrderButton member={member} orderId={order?.id} />
        )}
        {!order?.canceled && (
          <OrderStartButton
            member={member}
            orderId={order?.id}
            started={order?.started}
          />
        )}
        <CompleteOrderButton
          canceled={order?.canceled}
          member={member}
          orderId={order?.id}
          started={order?.started}
        />
        {!order?.canceled && (
          <CancelOrderButton
            canceled={order?.canceled}
            member={member}
            orderId={order?.id}
          />
        )}
      </MapBoxMarker>
    </Suspense>
  ) : null
}
