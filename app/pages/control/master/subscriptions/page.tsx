import { Metadata } from 'next'
import ListSubscriptions from './views/ListSubscriptions'

export const metadata: Metadata = {
  alternates: {
    canonical: 'master/users',
  },
  title: {
    default: 'Controle de Assinaturas da Plataforma',
    template: `%s | Dedicado`,
  },
}

export default function SubscriptionControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ListSubscriptions />
    </div>
  )
}
