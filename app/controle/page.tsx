import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Controle da Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function ControlPage() {
  return (
    <main className="w-full min-h-full flex justify-center items-center">
      controle
    </main>
  )
}
