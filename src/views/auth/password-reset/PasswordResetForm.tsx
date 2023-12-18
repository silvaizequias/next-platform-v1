import {
  PasswordResetDTO,
  PasswordResetDTOType,
} from '@/app/api/platform-management/password-reset/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function PasswordResetForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PasswordResetDTOType>({
    mode: 'all',
    resolver: zodResolver(PasswordResetDTO),
  })

  const onSubmit: SubmitHandler<PasswordResetDTOType> = async (inputs) => {
    try {
      await fetch(`/api/platform-management/password-reset`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
          reset(inputs)
          toast.success(data)
        } else {
          toast.error(data)
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    } finally {
      reset(inputs)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <Controller
        {...register('email')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="email"
            type="email"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('phone')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            className="rounded-md"
            name="phone"
            type="number"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <button
        className="w-full uppercase rounded-md bg-orange-600 hover:opacity-75 py-2 text-white text-base hover:font-medium"
        type="submit"
      >
        Redefinir a Senha
      </button>
    </form>
  )
}
