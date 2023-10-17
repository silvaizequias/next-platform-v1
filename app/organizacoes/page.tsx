import OrganizationsView from '@/views/organizations'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Organizações',
}

export default function OrganizationsPage() {
  return (
    <Fragment>
      <OrganizationsView />
    </Fragment>
  )
}
