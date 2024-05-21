import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import { memo } from 'react'
import RegisterView from './views/RegisterView'

export const metadata: Metadata = {
  title: {
    default: 'registrar-se na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const RegisterPage = () => {
  return (
    <PageDisplay
      title="registrar-se"
      subtitle="sua melhor plataforma de serviços"
    >
      <RegisterView />
    </PageDisplay>
  )
}
export default memo(RegisterPage)
