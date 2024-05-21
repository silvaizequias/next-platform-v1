'use client'

import { OrderType } from '@/types/order'
import { OrganizationType } from '@/types/organization'
import { Suspense } from 'react'
import { usePlatform, LocationType } from '@/contexts/PlatformContext'
import OrderMapMarker from '../components/OrderMapMarker'
import MapBox from '@/components/MapBox'
import MapBoxMarker from '@/components/MapBoxMarker'
import { useOrder } from '@/contexts/OrderContext'
import { useOrganization } from '@/contexts/OrganizationContext'

export default function OrderMapView() {
  const { orders }: OrderType[] | any = useOrder()
  const { organization }: OrganizationType | any = useOrganization()
  const { location }: LocationType | any = usePlatform()

  const logotipo = organization?.image || '/logotipo.svg'

  return orders?.length > 0 ? (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full space-2">
          <MapBox
            latitude={organization?.latitude || location?.latitude}
            longitude={organization?.longitude || location?.longitude}
            zoom={12}
          >
            <Suspense>
              <MapBoxMarker
                latitude={organization?.latitude}
                longitude={organization?.longitude}
                title={organization?.name}
                image={logotipo}
              />
              {orders?.map((order: OrderType) => {
                return (
                  !order?.completed && (
                    <div key={order?.id}>
                      <OrderMapMarker order={order} />
                    </div>
                  )
                )
              })}
            </Suspense>
          </MapBox>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative">
      <div className="py-4">
        <h4 className="text-center text-xl dark:text-white lowercase ">
          não existem pedidos para esta organização
        </h4>
      </div>
    </div>
  )
}
