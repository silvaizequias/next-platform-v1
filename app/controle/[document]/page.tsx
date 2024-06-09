import { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata({
  params,
}: {
  params: { document: string }
}): Promise<Metadata | null> {
  const { document } = params

  return {
    title: {
      default: `na ${
        document || ''
      } você está no controle com a melhor plataforma de serviços`,
      template: `%s | dedicado`,
    },
    description:
      'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
  }
}

export default function OrganizationPage({
  params,
}: {
  params: { document: string }
}) {
  const { document } = params

  const logotipo = '/logotipo.svg'

  return (
    <main className="min-h-full h-screen w-full flex justify-center items-center bg-slate-800">
      <section className="w-full flex flex-col justify-center items-center gap-2 animate-in">
        <figure className="mx-auto animate-bounce">
          <Image
            src={logotipo}
            alt="dedicado"
            width={200}
            height={380}
            priority
          />
        </figure>
        <h1 className="font-default font-semibold text-balance text-center text-sky-400">
          dedicado
        </h1>
        <p className="text-balance text-center text-sky-800 animate-pulse">
          sua melhor plataforma de serviços
        </p>
      </section>
    </main>
  )
}
