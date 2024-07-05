import { Metadata } from 'next'
import ListUsers from './views/ListUsers'

export const metadata: Metadata = {
  alternates: {
    canonical: 'master/users',
  },
  title: {
    default: 'Controle de Usuários da Plataforma',
    template: `%s | Dedicado`,
  },
}

export default function UserControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ListUsers />
    </div>
  )
}
