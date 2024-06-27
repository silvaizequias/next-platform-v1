import DefaultDisplay from '@/components/default-display'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  MdAutoGraph,
  MdCloudSync,
  MdOutlineKeyboardArrowDown,
  MdOutlinePolyline,
} from 'react-icons/md'

export const metadata: Metadata = {
  title: {
    default:
      'Potencialize a capacidade da sua demanda operacional utilizando inteligência artificial',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default function HomePage() {
  const logotipo = '/logotipo.svg'
  const cloudHosting = '/cloud_hosting.svg'

  return (
    <DefaultDisplay>
      <div className="w-full bg-gradient-to-b from-sky-200/60 to-slate-200">
        <header className="w-full sm:max-w-4xl mx-auto p-2 py-24 flex flex-col sm:flex-row-reverse justify-center items-center">
          <figure className="sm:w-1/3 w-[200px] h-[350px] mx-auto flex justify-center">
            <Image
              src={logotipo}
              alt="dedicado"
              width={200}
              height={350}
              priority
            />
          </figure>
          <div className="w-full">
            <h1 className="leading-tight text-center sm:text-left text-sky-600 uppercase font-semibold text-balance">
              Sua Melhor Plataforma de Serviços
            </h1>
            <h4 className="py-4 text-center sm:text-left text-sky-800 font-semibold text-balance">
              Potencialize a capacidade{' '}
              <span className="font-light">
                da sua demanda operacional
              </span>{' '}
              utilizando inteligência artificial
            </h4>
            <div className="w-full flex justify-center sm:justify-start">
              <Link
                href={'contato'}
                className="w-full max-w-sm p-2 bg-sky-600/80 hover:shadow-md hover:bg-gradient-to-r from-sky-600/80 to-cyan-600/60 hover:opacity-80 rounded-md text-slate-200 text-center font-semibold uppercase"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </header>
      </div>
      <section className="w-full h-full py-4 bg-gradient-to-t from-white drop-shadow-md">
        <div className="w-full mx-auto p-8 sm:max-w-4xl">
          <h4 className="leading-tight text-center text-balance text-slate-600 lowercase">
            A <span className="text-sky-800 text-4xl">dedicado</span> oferece
            soluções personalizadas de{' '}
            <span className="text-sky-800">alta performance</span> que aumentam
            a <span className="text-sky-800">produtividade</span> de pessoas e
            organizações
          </h4>
          <MdOutlineKeyboardArrowDown
            size={60}
            className="mx-auto mt-4 text-sky-800 animate-bounce cursor-pointer"
          />
        </div>
      </section>
      <section className="w-full h-full py-4">
        <div className="w-full mx-auto p-8 sm:max-w-4xl">
          <h2 className="leading-tight text-center text-balance font-light text-sky-800 uppercase">
            <span className="font-semibold">Cuidamos de tudo</span> pra você
          </h2>
          <div className="w-full py-8 flex flex-col sm:flex-row justify-center items-start gap-4">
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <MdOutlinePolyline size={80} className="text-sky-800" />
              <h6 className="text-sky-800 text-center font-bold uppercase">
                Integração
              </h6>
              <small className="text-center text-pretty">
                Integramos sistemas com nossas soluções de gestão de serviços
                transacionais otimizada com inteligência artificial, e
                desenvolvemos soluções personalizadas para sistemas já
                existentes.
              </small>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <MdAutoGraph size={80} className="text-sky-800" />
              <h6 className="text-sky-800 text-center font-bold uppercase">
                Otimização
              </h6>
              <small className="text-center text-pretty">
                Realizamos o mapeamento completo de todo o fluxo do sistema afim
                de encontrar pontos de melhoria, desenhando a melhor estratégia
                para otimização.
              </small>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <MdCloudSync size={80} className="text-sky-800" />
              <h6 className="text-sky-800 text-center font-bold uppercase">
                Sustentação
              </h6>
              <small className="text-center text-pretty">
                Com foco em redução de custos e otimização de recursos, optamos
                por uma arquitetura de fácil implementação, visando uma melhor
                manutenabilidade e escalabilidade.
              </small>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-full py-4 bg-gradient-to-t from-white to-slate-200">
        <div className="w-full mx-auto p-8 sm:max-w-4xl">
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
            <figure className="mx-auto w-auto h-auto p-4">
              <Image
                src={cloudHosting}
                alt="infraestrututa dedicado"
                width={500}
                height={490}
                priority
              />
            </figure>
            <div className="w-full flex flex-col justify-center item-center gap-4">
              <h4 className="text-sky-800 text-center sm:text-left">
                Infraestrutura SaaS
              </h4>
              <h6 className="text-slate-600 text-balance text-center sm:text-left -mt-4">
                Garantia de alta disponibilidade, segurança escalabilidade
              </h6>
              <p className="w-full text-pretty text-center sm:text-left">
                Todos os serviços de nossas soluções são alocados nas maiores
                plataformas de computação em nuvem do mundo.
              </p>
              <p className="w-full text-pretty text-center sm:text-left">
                Nossa arquitetura é envolvida por uma camada de isolamento VPC
                que utiliza protocolos de segurança para a comunicação entre
                serviços.
              </p>
              <p className="w-full text-pretty text-center sm:text-left">
                Cada serviço de nossas soluções conta com um gerenciador de
                balanceamento de carga para garantir a disponibilidade em
                condições de alta demanda.
              </p>
              <div className="w-full flex justify-center sm:justify-start">
                <Link
                  href={'contato'}
                  className="w-full max-w-sm p-2 bg-sky-600/80 hover:shadow-md hover:bg-gradient-to-r from-sky-600/80 to-cyan-600/60 hover:opacity-80 rounded-md text-slate-200 text-center font-semibold uppercase"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-full py-4 bg-sky-600/80 shadow-md">
        <div className="w-full mx-auto p-8 sm:max-w-4xl">
          <h2 className="leading-tight text-center text-balance font-bold bg-clip-text text-transparent bg-gradient-to-t from-slate-200 to-white uppercase">
            O <span className="font-semibold">sistema dedicado</span>
          </h2>
          <p className="leading-tight text-center text-pretty font-light text-slate-200">
            Que atende sua demanda de forma{' '}
            <span className="font-semibold">inteligente e eficiente</span>
          </p>
        </div>
      </section>
    </DefaultDisplay>
  )
}
