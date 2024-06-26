import { Metadata } from 'next'
import ControlAuthForm from './form'

export const metadata: Metadata = {
  title: {
    default: 'Autenticação da Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function ControlAuthPage() {
  return (
    <main
      className="z-10 w-full min-h-full h-screen mx-auto"
      style={{
        backgroundImage: `url('/two_factor_authentication.svg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <section className="w-full min-h-full backdrop-blur-md bg-sky-800/60 p-10 flex justify-center place-items-center">
        <div className="relative w-full max-w-sm bg-slate-200 p-4 rounded-md shadow-md">
          <ControlAuthForm />
        </div>
      </section>
    </main>
  )
}
