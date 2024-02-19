import Image from 'next/image'

export default function LandingPageView() {
  const logotipo = '/logotipo.svg'

  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <div className="p-8">
        <div className="mx-auto text-center">
          <Image
            className="w-[200px] h-[350px] mx-auto"
            src={logotipo}
            alt="dedicado"
            width={200}
            height={350}
            priority
          />
          <h1 className="text-6xl text-sky-400 font-medium">dedicado</h1>
          <h6 className="text-md font-thin">a melhor plataforma de serviços</h6>
        </div>
      </div>
    </div>
  )
}
