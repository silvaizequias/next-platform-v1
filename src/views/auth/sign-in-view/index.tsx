import { Card, CardBody } from '@nextui-org/react'
import SignUpForm from '@/components/forms/auth/sign-up'
import PageSection from '@/components/page-section'
import Box from '@/components/box'

export default function SignInView() {
  return (
    <PageSection title='Dedicado' subtitle='Registro de Acesso' description='Registre-se na DEDICADO para utilizar todos os serviços da plataforma'>
      <Box>
        <div className="flex justify-center text-center">
          <Card
            className="min-w-[360px] sm:w-[400px] bg-slate-100 dark:bg-slate-900"
            isBlurred={true}
            shadow="md"
          >
            <CardBody>
              <SignUpForm />
            </CardBody>
          </Card>
        </div>
      </Box>
    </PageSection>
  )
}
