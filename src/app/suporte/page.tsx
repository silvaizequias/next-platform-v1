import SupportView from '@/views/support'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Suporte Especializado',
}

export default function SupportPage() {
  return (
    <Fragment>
      <SupportView />
    </Fragment>
  )
}
