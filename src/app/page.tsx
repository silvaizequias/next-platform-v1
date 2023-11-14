import { Metadata } from 'next'
import LandingView from './views'
import DashView from './views/DashView'

export const metadata: Metadata = {
  title: 'Sistemas Personalizados de Alta Performance',
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function LandingPage() {
  const session: boolean = false

  return !session ? <LandingView /> : <DashView />
}
