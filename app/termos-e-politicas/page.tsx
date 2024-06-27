import DefaultDisplay from '@/components/default-display'
import { Metadata } from 'next'
import TermsAndPoliciesView from './views/TermsAndPoliciesView'

export const metadata: Metadata = {
  title: {
    default: 'Termos e Políticas de Utilização da Plataforma',
    template: `%s | Dedicado`,
  },
  description:
    'A Dedicado se compromete em manter a privacidade da utilização dos dados dos usuários na plataforma.',
}

export default async function TermsAndPoliciesPage() {
  return (
    <DefaultDisplay>
      <section className="relative w-full h-full py-4">
        <div className="w-full bg-gradient-to-b from-sky-200/60 to-slate-200">
          <header className="w-full mx-auto max-w-4xl p-2 py-20">
            <h1 className="text-center text-balance text-sky-800">
              Termos e Políticas de Utilização da Plataforma
            </h1>
          </header>
        </div>
        <TermsAndPoliciesView />
      </section>
    </DefaultDisplay>
  )
}
