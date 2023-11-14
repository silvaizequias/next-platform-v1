import { Metadata } from 'next'
import SignInView from './views'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Registrar-se no Portal Dedicado',
  description: 'Página de registro de acesso ao Portal Dedicado!',
}

export default async function SignInPage() {
  const session: boolean = false

  return !session ? <SignInView /> : redirect('/')
}
