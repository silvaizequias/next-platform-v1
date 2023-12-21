'use client'

import Box from '@/components/box'
import PageSection from '@/components/page-section'
import { useRouter } from 'next/navigation'
import SignInForm from './form'

export default function AuthSignInScreen() {
  const router = useRouter()

  return (
    <PageSection
      title="Dedicado"
      subtitle=" Autenticar-se"
      description="Informe suas credenciais para acessar o sistema"
    >
      <Box>
        <div className="flex justify-center text-center">
          <div className="min-w-[360px] sm:w-[400px] bg-slate-50 rounded-md p-4 shadow-md">
            <div>
              <SignInForm />
            </div>
            <div className="flex justify-end">
              <p
                className="font-thint text-xs text-right italic m-2 cursor-pointer hover:opacity-50 lowercase"
                onClick={() => router.push('/auth/registrar-se')}
              >
                Ainda não possui acesso?
              </p>
            </div>
          </div>
        </div>
      </Box>
    </PageSection>
  )
}
