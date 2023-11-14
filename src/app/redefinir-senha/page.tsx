import { Metadata } from 'next'
import ForgotPasswordView from './views'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Redefinir Senha',
  description: 'Página de redefinição de acesso ao Portal Dedicado!',
}

export default async function ForgotPasswordPage() {
  const session: boolean = false

  return !session ? <ForgotPasswordView /> : redirect('/')
}
