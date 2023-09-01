import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import toast from 'react-hot-toast'

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
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
        .then((res: any) => {
          if (!res?.error) {
            toast.success('Boas vindas ao seu Dedicado Digital!')
            router.refresh()
          } else {
            toast.error('O celular ou a senha estão incorretos!')
          }
        })
        .catch((error: any) => {
          toast.error(error?.message)
        })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error?.message || error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='phone'
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
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Senha'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.password)}
              type={showPassword ? 'text' : 'password'}
              placeholder='**********'
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
        color='info'
        sx={{ mb: 4 }}
      >
        Autenticar-se
      </Button>
    </form>
  )
}
