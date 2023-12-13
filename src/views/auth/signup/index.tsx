'use client'

import PageSection from '@/components/page-section'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import SignUpForm from './SignUpForm'
import Box from '@/components/box'
import { useRouter } from 'next/navigation'

export default function AuthSignUpView() {
  const router = useRouter()

  return (
    <PageSection
      title="Dedicado"
      subtitle="Registro de Acesso"
      description="Registre-se na DEDICADO para utilizar todos os serviços da plataforma"
    >
      <Box>
        <div className="flex justify-center text-center">
          <Card
            className="min-w-[360px] sm:w-[400px] bg-zinc-200 dark:bg-zinc-800"
            isBlurred={true}
            shadow="md"
          >
            <CardBody>
              <SignUpForm />
            </CardBody>
            <CardFooter className='flex justify-end'>
              <p
                className="font-thint text-xs text-right italic m-2 cursor-pointer hover:opacity-50"
                onClick={() => router.push('/auth')}
              >
                Já possui acesso?
              </p>
            </CardFooter>
          </Card>
        </div>
      </Box>
    </PageSection>
  )
}
