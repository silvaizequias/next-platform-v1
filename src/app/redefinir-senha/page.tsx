import { Metadata } from 'next'
import ForgotPasswordView from './views'

export const metadata: Metadata = {
  title: 'Redefinir Senha',
  description: 'Página de redefinição de acesso ao Portal Dedicado!',
}

export default async function ForgotPasswordPage() {
  return <ForgotPasswordView />
}
