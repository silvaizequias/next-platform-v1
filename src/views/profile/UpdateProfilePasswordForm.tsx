import {
  UpdateProfilePasswordDTO,
  UpdateProfilePasswordDTOType,
} from '@/app/api/profile/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UpdateProfilePasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdateProfilePasswordDTOType>({
    mode: 'all',
    resolver: zodResolver(UpdateProfilePasswordDTO),
  })

  const onSubmit: SubmitHandler<UpdateProfilePasswordDTOType> = async (
    inputs,
  ) => {
    try {
      await fetch(`/api/profile/update-password`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res: any) => {
        const data = await res.json()
        if (res.status == 201) {
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
        {...register('oldPassword')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="oldPassword"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('newPassword')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="newPassword"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        {...register('confirmNewPassword')}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name="confirmNewPassword"
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <button className="w-full uppercase" type="submit">
        Atualizar Senha
      </button>
    </form>
  )
}
