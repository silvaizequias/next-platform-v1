import LandingView from '@/views/landing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistemas Personalizados de Alta Performance',
}

export default function LandingPage() {
  return <LandingView />
}
