import { Metadata } from 'next'
import Image from 'next/image'
import { MdAutoAwesomeMotion, MdAutoGraph, MdAutoMode } from 'react-icons/md'

export const metadata: Metadata = {
  title: {
    default: 'Sua Melhor Plataforma de Serviços',
    template: `%s | dedicado`,
  },
  description:
    'a dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function MainPage() {
  const logotipo = '/logotipo.svg'

  return (
    <main className="min-h-full h-full w-full flex flex-col justify-center items-center">
      <header className="w-full h-screen max-w-6xl p-2 flex flex-col-reverse sm:flex-row justify-center items-center">
        <div className="w-full p-4 flex flex-col gap-2">
          <h1 className="font-default font-bold text-sky-800 text-center sm:text-left">
            Sua Melhor Plataforma de Serviços
          </h1>
          <h6 className="text-balance text-sky-600 text-center sm:text-left">
            <span className="font-semibold text-sky-800">{`Potencialize a capacidade`}</span>{' '}
            {`da sua demanda operacional`}{' '}
            <span className="font-semibold text-sky-800">{`utilizando inteligência artificial`}</span>
          </h6>
        </div>

        <div className="w-full p-4 flex flex-col gap-2">
          <figure className="relative mx-auto p-2">
            <Image
              src={logotipo}
              alt="dedicado"
              width={220}
              height={400}
              priority
            />
          </figure>
        </div>
      </header>

      <section className="relative w-full h-full p-2 bg-slate-50 flex flex-col justify-center items-center gap-8">
        <div className="w-full max-w-2xl py-10">
          <h6 className="text-center text-sky-800 font-medium">
            {`a`}
            <span className="text-6xl">dedicado</span>
            {`oferece soluções personalizadas de alta
            performance que aumentam a produtividade de pessoas e organizações`}
          </h6>
        </div>

        <h4 className="w-full max-w-6xl text-center text-sky-800/80 uppercase">
          {`Um pouco do que podemos `}
          <span className="font-semibold">{` fazer por você`}</span>
        </h4>

        <div className="relative w-full max-w-6xl py-8 flex flex-col sm:flex-row justify-center items-start gap-4">
          <div className="w-full sm:w-60 mx-auto text-center text-sky-800">
            <MdAutoMode size={110} className="mx-auto text-cyan-600" />
            <p className="uppercase p-4 font-semibold">{`Integração e Implementação`}</p>
            <small className="text-balance">{`Integramos sistemas com nossas soluções de gestão de serviços transacionais otimizadas com inteligência artificial, ou desenvolvemos soluções personalizadas para implementação em sistemas já existentes.`}</small>
          </div>
          <div className="w-full sm:w-60  mx-auto text-center text-balance text-sky-800">
            <MdAutoGraph size={110} className="mx-auto text-green-600" />
            <p className="uppercase p-4 font-semibold">{`Otimização de Sistemas`}</p>
            <small className="">{`Realizamos o mapeamento completo de todo o fluxo do sistema afim de encontrar pontos de melhoria, e desenhamos a melhor estratégia para otimização.`}</small>
          </div>
          <div className="w-full sm:w-60  mx-auto text-center text-balance text-sky-800">
            <MdAutoAwesomeMotion size={110} className="mx-auto text-sky-600" />
            <p className="uppercase p-4 font-semibold">{`Arquitetura Distribuída`}</p>
            <small className="">{`Com foco em redução de custos e otimização de recursos operacionais, optamos por soluções de fácil implementação, visando uma melhor manutenabilidade para sua sustentação e escalabilidade.`}</small>
          </div>
        </div>
      </section>
      <section className="relative w-full h-full p-2 bg-slate-50 flex flex-col justify-center items-center gap-8"></section>
    </main>
  )
}
