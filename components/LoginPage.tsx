import Image from 'next/image'
import { memo } from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const logotipo = '/logotipo.svg'

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center">
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
        <div className="max-w-sm rounded-md shadow-md bg-slate-100 dark:bg-slate-600 dark:text-slate-800">
          <div className="w-full p-4">
            <h4 className="text-lg text-center dark:text-slate-200 my-4">
              informe suas credenciais para autenticar-se na plataforma
            </h4>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(LoginPage)
