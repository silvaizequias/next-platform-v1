import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'master',
  },
  title: {
    default: 'Controle Máximo da Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadasque atendem necessidades específicas da operação, visando a alta disponibilidade com o menor custo de sustentação.',
}

export default function MasterControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      controle máximo
    </div>
  )
}
