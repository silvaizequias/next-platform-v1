'use client'

import {
  SignInDTO,
  SignInDTOType,
} from '@/app/api/platform-management/signin/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  session: Session
}

export default function SignInTemporaryView(props: Props) {
  const { session } = props

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SignInDTOType>({
    resolver: zodResolver(SignInDTO),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<SignInDTOType> = async (inputs) => {
    const { email, password } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      }).then(async (res: any) => {
        if (res.error) alert(res.error)
        router.refresh()
      })
    } catch (error: any) {
      console.error(error)
    } finally {
      reset
    }
  }

  return session ? (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="flex justify-center">
        <button
          className="uppercase bg-slate-400 hover:opacity-50 px-4 rounded-md"
          onClick={() => signOut()}
        >
          Sair
        </button>
      </div>
      <div className="flex justify-center max-w-lg">{session.user.name}</div>
    </div>
  ) : (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <Controller
                {...register('email')}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="email"
                    name="email"
                    value={value}
                    onChange={onChange}
                    onError={() => errors.email?.message}
                  />
                )}
              />
              {errors && (
                <span className="text-red-400 text-sm italic">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Controller
                {...register('password')}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="password"
                    name="password"
                    value={value}
                    onChange={onChange}
                    onError={() => errors.password?.message}
                  />
                )}
              />
              {errors && (
                <span className="text-red-400 text-sm italic">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <button type="submit" className="bg-blue-200 hover:bg-blue-400 uppercase rounded-md">
              Autenticar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
