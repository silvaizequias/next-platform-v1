import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AuthSignInForm() {
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AuthSignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(AuthSignInSchema),
  })

  const onSubmit: SubmitHandler<AuthSignInSchemaType> = async (inputs, e) => {
    e?.preventDefault()

    const { phone, password } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        phone: phone,
        password: password,
      })
        .then(async (res: any) => {
          if (res.url && !res.error) {
            toast.success('Boas vindas!')
            router.refresh()
          } else {
            toast.error('O telefone ou a senha estão incorretos')
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
          {...register('password')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Senha'}
              type={'password'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.password)}
              placeholder='********'
            />
          )}
        />
        {errors.password && (
          <FormHelperText>{errors.password.message}</FormHelperText>
        )}
      </FormControl>
      <Button
        fullWidth
        size='small'
        type='submit'
        variant='contained'
        color='primary'
        sx={{ my: 2 }}
      >
        Acessar
      </Button>
    </form>
  )
}
