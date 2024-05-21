import { Tab } from '@headlessui/react'
import { Fragment, Suspense } from 'react'
import OrderListView from './OrderListView'
import OrderMapView from './OrderMapView'

export default function OrderTabsView() {
  return (
    <div className="w-full">
      <Tab.Group key={'order-map'}>
        <Tab.List className="w-full p-2 mb-2 flex justify-around space-x-2 bg-slate-200 rounded-md">
          <Tab as={Fragment} key={'order-map'}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? 'w-full p-1 flex justify-center bg-sky-800 text-white text-center rounded-md shadow-md'
                    : 'w-full p-1 flex justify-center opacity-50 bg-sky-600/60 text-white text-center rounded-md'
                }
              >
                mapa de pedidos
              </button>
            )}
          </Tab>
          <Tab as={Fragment} key={'order-list'}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? 'w-full p-1 flex justify-center bg-sky-800 text-white text-center rounded-md shadow-md'
                    : 'w-full p-1 flex justify-center opacity-50 bg-sky-600/60 text-white text-center rounded-md'
                }
              >
                lista de pedidos
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-2">
          <Tab.Panel key={'order-map'}>
            <div className="w-full">
              <Suspense>
                <OrderMapView />
              </Suspense>
            </div>
          </Tab.Panel>
          <Tab.Panel key={'order-list'}>
            <div className="w-full">
              <Suspense>
                <OrderListView />
              </Suspense>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
