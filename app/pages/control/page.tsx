import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Você no Controle da Melhor Plataforma de Serviços',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadasque atendem necessidades específicas da operação, visando a alta disponibilidade com o menor custo de sustentação.',
}

export default function ControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      control
    </div>
  )
}
