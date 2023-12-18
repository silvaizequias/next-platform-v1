'use client'

import Box from '@/components/box'
import PageSection from '@/components/page-section'
import PasswordResetForm from './PasswordResetForm'
import { useRouter } from 'next/navigation'

export default function AuthPasswordResetView() {
  const router = useRouter()

  return (
    <PageSection
      title="Dedicado"
      subtitle="Redefinição de senha"
      description="Informe seu e-mail e telefone para receber uma nova senha de acesso"
    >
      <Box>
        <div className="flex justify-center text-center">
          <div className="min-w-[360px] sm:w-[400px] bg-slate-50 rounded-md p-4 shadow-md">
            <div>
              <PasswordResetForm />
            </div>
            <div className="flex justify-end">
              <p
                className="font-thint text-xs text-right italic m-2 cursor-pointer hover:opacity-50"
                onClick={() => router.push('/auth')}
              >
                Mudou de ideia?
              </p>
            </div>
          </div>
        </div>
      </Box>
    </PageSection>
  )
}
