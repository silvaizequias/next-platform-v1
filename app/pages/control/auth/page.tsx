import { Metadata } from 'next'
import Image from 'next/image'
import Auth from './views/Auth'

export const metadata: Metadata = {
  alternates: {
    canonical: 'auth',
  },
  title: {
    default: 'Acessar o Painel de Controle da Plataforma',
    template: `%s | Dedicado`,
  },
  description: 'Você no Controle da Melhor Plataforma de Serviços.',
}

export default function AuthPage() {
  const logotipo = '/logotipo.svg'

  return (
    <main className="w-full h-screen flex flex-col sm:flex-row justify-center items-center">
      <header className="relative">
        <div className="w-full max-w-sm p-2 flex flex-col justify-center items-center gap-2">
          <figure className="w-[179px] h-[260px] mx-auto flex justify-center">
            <Image
              src={logotipo}
              alt="dedicado"
              width={179}
              height={260}
              priority
            />
          </figure>
        </div>
      </header>
      <section className="relative">
        <div className="w-full max-w-sm p-2 flex flex-col justify-center items-center gap-2">
          <h4 className="text-sky-600">Você no Controle</h4>
          <Auth />
        </div>
      </section>
    </main>
  )
}
