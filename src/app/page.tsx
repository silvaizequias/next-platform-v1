import { Metadata } from 'next'
import LandingView from './views'

export const metadata: Metadata = {
  title: 'Sistema Personalizado de Alta Performance',
}

export default async function LandingPage() {
  return <LandingView />
}
