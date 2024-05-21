import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPage() {
  const logotipo = '/logotipo.svg'

  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <div className="p-8">
        <div className="mx-auto text-center space-y-4">
          <Image
            className="w-[200px] h-[350px] mx-auto"
            src={logotipo}
            alt="dedicado"
            width={200}
            height={350}
            priority
          />
          <h6 className="text-md font-semibold">
            você não encontrará nada por aqui
          </h6>
          <Link
            href={`${process.env.NEXTAUTH_URL}`}
            className="text-4xl font-thin hover:opacity-50"
          >
            retorne ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
