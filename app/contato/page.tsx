import { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from './form'
import DefaultDisplay from '@/components/default-display'

export const metadata: Metadata = {
  alternates: {
    canonical: 'contato',
  },
  title: {
    default: 'Conte-nos como podemos te ajudar?',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadasque atendem necessidades específicas da operação, visando a alta disponibilidade com o menor custo de sustentação.',
}

export default function ContactPage() {
  const messageSent = '/message_sent.svg'

  return (
    <DefaultDisplay>
      <div className="w-full bg-gradient-to-b from-sky-200/60 to-slate-200">
        <header className="w-full mx-auto max-w-4xl p-2 py-20">
          <h1 className="text-center text-balance text-sky-800">
            Deixa a gente saber como podermos te ajudar!
          </h1>
        </header>
      </div>

      <section className="w-full min-h-full mx-auto bg-gradient-to-t from-white to-slate-200">
        <div className="w-full mx-auto p-2 py-8 sm:max-w-4xl">
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4">
            <figure className="sm:w-2/3 mx-auto h-auto w-auto">
              <Image
                src={messageSent}
                alt="contato dedicado"
                width={300}
                height={500}
                priority
              />
            </figure>
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </DefaultDisplay>
  )
}
