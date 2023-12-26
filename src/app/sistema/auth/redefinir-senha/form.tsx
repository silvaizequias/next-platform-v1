import {
  PasswordResetDTO,
  PasswordResetDTOType,
} from '@/app/api/platform-management/password-reset/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
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
        if (res.status == 200) {
          reset(inputs)
          toast.success(res.text())
          router.push('/auth')
        } else {
          toast.error(res.text())
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
          <Input
            crossOrigin={undefined}
            color="orange"
            size="md"
            label={'e-mail'}
            name="email"
            type="email"
            value={value}
            onChange={onChange}
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
          <Input
            crossOrigin={undefined}
            color="orange"
            size="md"
            label={'celular'}
            name="phone"
            type="number"
            value={value}
            onChange={onChange}
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
