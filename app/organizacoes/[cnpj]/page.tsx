import OrganizationView from '@/views/organizations/OrganizationView'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Organização',
}

export default function OrganizationPage({
  params,
}: {
  params: { cnpj: string }
}) {
  const { cnpj } = params

  return (
    <Fragment>
      <OrganizationView />
    </Fragment>
  )
}
