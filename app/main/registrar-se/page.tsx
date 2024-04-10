import RegisterForm from '@/components/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const RegisterPage = () => {
  const logotipo = '/logotipo.svg'

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-8">
        <div className="relative">
          <Image
            className="w-[150px] h-[300px] mx-auto"
            src={logotipo}
            alt="dedicado"
            width={150}
            height={300}
            priority
          />
          <h1 className="text-6xl text-center text-sky-400 font-medium">
            dedicado
          </h1>
          <h6 className="text-md text-center font-thin">
            a melhor plataforma de serviços
          </h6>
        </div>
        <div className="mb-4 max-w-sm rounded-md shadow-md bg-slate-100 dark:bg-slate-600 dark:text-slate-800">
          <div className="w-full p-4">
            <h4 className="text-lg text-center dark:text-slate-200 my-4">
              preencha os campos abaixo e tenha acesso a todos os recursos da
              plataforma
            </h4>
            <RegisterForm />
            <Link
              href={`/`}
              className="text-sm text-center dark:text-sky-600 cursor-pointer"
            >
              já sou registrado
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(RegisterPage)
