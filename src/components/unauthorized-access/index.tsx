'use client'

import PageSection from '@/components/page-section'
import { useRouter } from 'next/navigation'

export default function UnauthorizedAccess() {
  const router = useRouter()

  return (
    <PageSection
      subtitle="Acesso não autorizado!"
      description="Você não tem permissão para acessar esta página"
    >
      <div className="flex justify-center">
        <button
          className="mt-2 w-full uppercase rounded-md bg-sky-600 hover:opacity-75 py-2 text-white text-base hover:font-medium"
          type="button"
          onClick={() => router.back()}
        >
          Retorne daqui
        </button>
      </div>
    </PageSection>
  )
}
