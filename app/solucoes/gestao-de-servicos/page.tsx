import ServiceManagementView from '@/views/solutions/service-management'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Gestão de Serviços',
}

export default function ServiceManagementPage() {
  return (
    <Fragment>
      <ServiceManagementView />
    </Fragment>
  )
}
