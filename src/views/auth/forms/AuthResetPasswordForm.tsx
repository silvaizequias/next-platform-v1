import {
  AuthResetPasswordSchema,
  AuthResetPasswordSchemaType,
} from '@/types/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AuthResetPasswordForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AuthResetPasswordSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthResetPasswordSchema),
  })

  const onSubmit: SubmitHandler<AuthResetPasswordSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios
        .post(`api/reset-password`, inputs)
        .then((res: any) => {
          if (res.data) {
            toast.success(res.data)
            router.refresh()
          } else {
            toast.error('Ocorreu um erro inesperado!')
          }
        })
        .catch((error: any) => {
          console.error(error)
          toast.error(error?.message)
        })
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ my: 2 }}>
        <Controller
          {...register('phone')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Celular'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.phone)}
              placeholder='11 98765 4321'
            />
          )}
        />
        {errors.phone && (
          <FormHelperText>{errors.phone.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('email')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Seu E-mail'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.email)}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && (
          <FormHelperText>{errors.email.message}</FormHelperText>
        )}
      </FormControl>
      <Button
        fullWidth
        size='small'
        type='submit'
        variant='contained'
        color='warning'
        sx={{ my: 2 }}
      >
        Redefinir a Senha
      </Button>
    </form>
  )
}
