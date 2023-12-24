'use client'

import PageSection from '@/components/page-section'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

export default function UnauthorizedAccess() {
  const router = useRouter()

  return (
    <PageSection
      subtitle="Acesso não autorizado!"
      description="Você não tem permissão para acessar esta página"
    >
      <div className="flex justify-center">
        <Button
          variant="gradient"
          color="blue"
          size="sm"
          type="button"
          onClick={() => router.back()}
        >
          Retorne daqui
        </Button>
      </div>
    </PageSection>
  )
}
