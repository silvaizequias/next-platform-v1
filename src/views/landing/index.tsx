import PageSection from '@/components/page-section'
import Image from 'next/image'

export default function LandingView() {
  const logotipo = '/logotipo.svg'

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="py-12">
        <div className="flex justify-center">
          <Image
            className="my-4 w-[179px] h-[259px]"
            src={logotipo}
            alt={'Dedicado'}
            priority
            //loading={'lazy'}
            width={179}
            height={259}
          />
        </div>
        <div className="mx-2 sm:mx-8 text-center">
          <div className="my-2 sm:my-4 mx-auto md:mx-40">
            <h1 className="text-4xl sm:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 font-semibold uppercase">
              Dedicado
            </h1>
          </div>
          <div className="my-2 sm:my-4 mx-auto md:mx-40">
            <h4 className="text-lg sm:text-2xl font-normal uppercase">
              Suporte e Desenvolvimento
            </h4>
          </div>
          <div className="my-6 mx-24 sm:mx-40 md:mx-60">
            <div className="my-2 bg-slate-400 px-14"></div>
          </div>
          <div className="my-2 sm:my-4 mx-auto md:mx-60">
            <p className="italic">
              Soluções personalizadas de sistemas de alta performance que
              aumentam a produtividade de pessoas e organizações
            </p>
          </div>
        </div>
        <div className="my-2 sm:my-8 mx-auto">
          <div className="flex justify-center">
            <h4 className="text-center text-md uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-800">
              Faça contato através do chat!
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}
