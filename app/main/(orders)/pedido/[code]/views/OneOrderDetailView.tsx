'use client'

import MapBox from '@/components/MapBox'
import MapBoxMarker from '@/components/MapBoxMarker'
import { useOrganization } from '@/contexts/OrganizationContext'
import { orderRepositoryFindByCode } from '@/repositories/order/GET'
import { OrderType } from '@/types/order'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function OneOrderDetailView() {
  const { authorizationKey }: any = useOrganization()
  const params = useParams()
  const { code }: any = params

  const [order, setOrder] = useState<OrderType>()

  const data = useCallback(async () => {
    if (!code) return null
    await orderRepositoryFindByCode(code, authorizationKey)
      .then((data) => setOrder(data))
      .catch((error: any) => console.log(error))
  }, [authorizationKey, code])

  useEffect(() => {
    code && data()
  }, [code, data])

  return order ? (
    <div className="relative">
      <MapBox
        latitude={order?.destinationLatitude}
        longitude={order?.destinationLongitude}
      >
        <MapBoxMarker
          latitude={order?.latitude || order?.destinationLatitude}
          longitude={order?.longitude || order?.destinationLongitude}
          title={order?.subject}
        >
          <div className="flex justify-center mb-2">
            <small className="text-xs text-center opacity-50">{`${
              order?.latitude || order?.destinationLatitude
            }, ${order?.longitude || order?.destinationLongitude}`}</small>
          </div>
          {order?.started && (
            <div className="flex justify-center bg-green-200 rounded-md p-2 my-2">
              <small className="text-xs text-center italic">
                {order?.startNote}
              </small>
            </div>
          )}

          {order?.canceled && (
            <div className="flex justify-center bg-orange-200 rounded-md p-2 my-2">
              <small className="text-xs text-center italic">
                {order?.cancellationNote}
              </small>
            </div>
          )}
          {order?.completed && (
            <div className="flex justify-center bg-slate-200 rounded-md p-2 my-2">
              <small className="text-xs text-center italic">
                {order?.completionNote}
              </small>
            </div>
          )}
        </MapBoxMarker>
      </MapBox>
    </div>
  ) : (
    <div className="w-full h-80 flex flex-col justify-center items-center gap-6">
      <div className="w-full max-w-lg">
        <h4 className="text-center text-lg dark:text-sky-400">
          {`o pedido com o código ${code} não foi encontrado na plataforma`}
        </h4>
      </div>
    </div>
  )
}
