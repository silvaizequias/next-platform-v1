import { Card, CardBody } from '@nextui-org/react'
import PageSection from '@/components/page-section'
import Box from '@/components/box'
import PasswordResetForm from '@/components/forms/auth/password-reset'

export default function PasswordResetView() {
  return (
    <PageSection
      title="Dedicado"
      subtitle="Redefinição de senha"
      description="Informe seu e-mail e telefone para receber uma nova senha de acesso"
    >
      <Box>
        <div className="flex justify-center text-center">
          <Card
            className="min-w-[360px] sm:w-[400px] bg-slate-100 dark:bg-slate-900"
            isBlurred={true}
            shadow="md"
          >
            <CardBody>
              <PasswordResetForm />
            </CardBody>
          </Card>
        </div>
      </Box>
    </PageSection>
  )
}
