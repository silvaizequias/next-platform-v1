'use client'

import Box from '@/components/box'
import PageSection from '@/components/page-section'
import SignInForm from './SignInForm'
import { useRouter } from 'next/navigation'

export default function AuthSignInView() {
  const router = useRouter()

  return (
    <PageSection
      title="Dedicado"
      subtitle=" Autenticar-se"
      description="Informe suas credenciais para acessar o sistema"
    >
      <Box>
        <div className="flex justify-center text-center">
          <div className="min-w-[360px] sm:w-[400px] bg-zinc-200 rounded-md">
            <div>
              <SignInForm />
            </div>
            <div className="flex justify-end">
              <p
                className="font-thint text-xs text-right italic m-2 cursor-pointer hover:opacity-50"
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
