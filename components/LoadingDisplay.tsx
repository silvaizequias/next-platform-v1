import Image from 'next/image'

export default function LoadingDisplay() {
  const logotipo = '/logotipo.svg'

  return (
    <div className="relative p-8">
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
  )
}
