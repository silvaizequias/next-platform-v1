import LandingView from '@/views/landing'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Sistemas Personalizados de Alta Performance',
}

export default function LandingPage() {
  return (
    <Fragment>
      <LandingView />
    </Fragment>
  )
}
