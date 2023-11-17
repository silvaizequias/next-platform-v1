import Container from '@/components/container'
import { Divider } from '@nextui-org/react'

export default function TermsOfServiceView() {
  return (
    <Container>
      <p className="mx-auto text-center py-4 px-12">
        Para utilizar as soluções da plataforma da{' '}
        <span className="uppercase font-medium">Dedicado Digital - </span>{' '}
        <span className="italic uppercase font-thin">
          52.378.516 Inova Simples (I.S.)
        </span>{' '}
        nossos clientes precisam concordar com nossos termos de serviço e
        políticas de uso.
      </p>
      <div className="mx-12 sm:mx-24">
        <Divider />
      </div>
    </Container>
  )
}
