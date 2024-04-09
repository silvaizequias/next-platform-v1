import Image from 'next/image'

export default function LoadingPage() {
  const logotipo = '/logotipo.svg'

  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <div className="p-8">
        <div className="mx-auto text-center">
          <Image
            className="w-[100px] h-[250px] mx-auto"
            src={logotipo}
            alt="dedicado"
            width={100}
            height={250}
            priority
          />
          <h6 className="text-md font-thin">...carregando</h6>
        </div>
      </div>
    </div>
  )
}
