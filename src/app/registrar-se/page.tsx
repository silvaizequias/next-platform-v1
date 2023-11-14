import { Metadata } from 'next'
import SignInView from './views'

export const metadata: Metadata = {
  title: 'Registrar-se no Portal Dedicado',
  description: 'Página de registro de acesso ao Portal Dedicado!',
}

export default async function SignInPage() {
  return <SignInView />
}
