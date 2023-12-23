import {
  PasswordResetDTO,
  PasswordResetDTOType,
} from '@/app/api/platform-management/password-reset/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function PasswordResetForm() {
  const router = useRouter()

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
          router.push('/auth')
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
      className="flex flex-col flex-1 gap-2 m-2"
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
            placeholder="seu@email.com"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.email?.message}
        </span>
      )}

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
            placeholder="48 98765 4321"
          />
        )}
      />
      {errors && (
        <span className="text-red-400 text-xs font-thin italic lowercase">
          {errors.phone?.message}
        </span>
      )}

      <Button
        variant="gradient"
        color="orange"
        size="sm"
        fullWidth
        type="submit"
      >
        Redefinir a Senha
      </Button>
    </form>
  )
}
