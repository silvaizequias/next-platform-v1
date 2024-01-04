import {
  UpdateProfilePasswordDTO,
  UpdateProfilePasswordDTOType,
} from '@/app/api/profile/dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@material-tailwind/react'
import { signOut } from 'next-auth/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ProfilePasswordUpdate() {
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
        if (res.status == 200) {
          toast.success(res.text())
          await signOut()
        } else {
          toast.error(res.text())
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    } finally {
      reset()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-4 m-2"
    >
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Controller
            {...register('oldPassword')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="orange"
                size="md"
                label={'senha atual'}
                name="oldPassword"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.oldPassword?.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <Controller
            {...register('newPassword')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="orange"
                size="md"
                label={'nova senha'}
                name="newPassword"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.newPassword?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Controller
            {...register('confirmNewPassword')}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                crossOrigin={undefined}
                color="orange"
                size="md"
                label={'confirmar nova senha'}
                name="confirmNewPassword"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && (
            <span className="text-red-400 text-xs font-thin italic lowercase">
              {errors.confirmNewPassword?.message}
            </span>
          )}
        </div>
      </div>

      <Button
        variant="gradient"
        color="orange"
        size="sm"
        fullWidth
        type="submit"
      >
        Atualizar Senha
      </Button>
    </form>
  )
}
