import Image from 'next/image'

export default function LoadingPage() {
  const logotipo = '/logotipo.svg'
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image
          className="w-[200px] h-[350px] mx-auto animate-pulse"
          src={logotipo}
          alt="dedicado"
          width={200}
          height={350}
          priority
        />
        <h1 className="text-center animate-puse opacity-60">carregando...</h1>
      </div>
    </div>
  )
}
